'use strict';

(() => {
  const defaults = { first: 'const one = 1;\nconsole.log(one);', second: 'const two = 2;\nconsole.log(two);' };
  const elements = {
    outputFile: document.querySelector('#output-file'), sourceRoot: document.querySelector('#source-root'),
    firstFile: document.querySelector('#first-file'), secondFile: document.querySelector('#second-file'),
    lineOffset: document.querySelector('#line-offset'), firstSource: document.querySelector('#first-source'),
    secondSource: document.querySelector('#second-source'), output: document.querySelector('#result-output'),
    status: document.querySelector('#status-text'), indicator: document.querySelector('#status-indicator'),
    sourceCount: document.querySelector('#source-count'), mappingCount: document.querySelector('#mapping-count')
  };
  let format = 'json';
  let result = null;

  document.querySelector('#combine-button').addEventListener('click', combineSources);
  document.querySelector('#reset-button').addEventListener('click', reset);
  document.querySelector('#copy-output-button').addEventListener('click', () => copyText(elements.output.textContent));
  document.querySelectorAll('[data-copy]').forEach((button) => button.addEventListener('click', () => copyText(button.dataset.copy, button)));
  document.querySelectorAll('[data-output]').forEach((button) => button.addEventListener('click', () => {
    format = button.dataset.output;
    document.querySelectorAll('[data-output]').forEach((candidate) => candidate.setAttribute('aria-pressed', String(candidate === button)));
    render();
  }));
  reset();

  function reset() {
    elements.outputFile.value = 'bundle.js'; elements.sourceRoot.value = '';
    elements.firstFile.value = 'src/one.js'; elements.secondFile.value = 'src/two.js';
    elements.lineOffset.value = '2'; elements.firstSource.value = defaults.first; elements.secondSource.value = defaults.second;
    combineSources();
  }

  function combineSources() {
    try {
      const lineOffset = Number(elements.lineOffset.value);
      if (!Number.isInteger(lineOffset) || lineOffset < 0) throw new TypeError('Second line offset must be a non-negative integer');
      const combiner = globalThis.StacklineCombineSourceMap.create(elements.outputFile.value || 'generated.js', elements.sourceRoot.value);
      combiner.addFile({ sourceFile: elements.firstFile.value || 'one.js', source: elements.firstSource.value });
      combiner.addFile({ sourceFile: elements.secondFile.value || 'two.js', source: elements.secondSource.value }, { line: lineOffset, column: 0 });
      const base64 = combiner.base64();
      const map = JSON.parse(decodeBase64(base64));
      result = { json: JSON.stringify(map, null, 2), comment: combiner.comment(), base64 };
      elements.status.textContent = 'Sources combined successfully';
      elements.indicator.classList.remove('error');
      elements.sourceCount.textContent = '2 source files';
      elements.mappingCount.textContent = `${map.sources.length} mapped sources`;
      render();
    } catch (error) {
      result = null;
      elements.output.textContent = error instanceof Error ? error.message : String(error);
      elements.status.textContent = 'Combination failed';
      elements.indicator.classList.add('error');
    }
  }

  function decodeBase64(value) {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index);
    return new TextDecoder().decode(bytes);
  }
  function render() { if (result) elements.output.textContent = result[format]; }
  async function copyText(value, button) {
    await navigator.clipboard.writeText(value);
    if (!button) return;
    const previous = button.textContent; button.textContent = 'Copied';
    window.setTimeout(() => { button.textContent = previous; }, 1200);
  }
})();

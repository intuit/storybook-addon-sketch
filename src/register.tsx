import React from 'react';
import addons from '@storybook/addons';
import SketchPlugin, { Options } from './components/sketch-download';

export default (options: Options) =>
  addons.register('sketch', api => {
    addons.add('sketch/panel', {
      type: 'tool',
      title: 'Sketch',
      match: ({ viewMode }) => viewMode === 'story',
      render: () => <SketchPlugin api={api} options={options} />
    });
  });

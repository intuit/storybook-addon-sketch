import React from 'react';
import join from 'url-join';

import {
  Icons,
  IconButton,
  WithTooltip,
  TooltipLinkList
} from '@storybook/components';
import downloadFile from '../download-file';

const downloadKind = (api: any) => () => {
  const withoutIndex = window.location.pathname
    .split('/')
    .slice(0, -1)
    .join('/');
  const baseUrl = join(window.location.origin, withoutIndex);
  const kind = api
    .getCurrentStoryData()
    .kind.replace(/ /g, '_')
    .replace(/\//g, '+');
  const file = kind + '.asketch.json';
  const url = join(baseUrl, 'sketch', file);

  fetch(url)
    .then(data => data.json())
    .then(json => downloadFile(file, json));
};

const downloadCurrent = (api: any) => () => {
  const iframe = document.querySelector('iframe');

  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.saveCurrent(api.getCurrentStoryData().id);
  }
};

const createBackgroundSelectorItem = (id: string, click: () => void) => ({
  id: id,
  title: id,
  onClick: click,
  value: id
});

export interface Options {
  kind: boolean;
}

interface SketchPluginProps {
  api: any;
  options: Options;
}

export default class SketchPlugin extends React.Component<SketchPluginProps> {
  state = {
    selected: null,
    expanded: false
  };

  static defaultProps = {
    options: {}
  };

  change = (options: { selected: string }) =>
    this.setState({ selected: options.selected, expanded: false });

  onVisibilityChange = (expanded: boolean) => {
    if (this.state.expanded !== expanded) {
      this.setState({ expanded });
    }
  };

  render() {
    const Button: React.FC<React.ComponentProps<typeof IconButton>> = props => (
      <IconButton {...props} title="Download Sketch File">
        <Icons icon="download" />
      </IconButton>
    );

    if (!this.props.options.kind) {
      return <Button onClick={downloadCurrent(this.props.api)} />;
    }

    const links = [
      createBackgroundSelectorItem(
        'Download Sketch files',
        downloadKind(this.props.api)
      ),
      createBackgroundSelectorItem(
        'Download Sketch Files for current story configuration',
        downloadCurrent(this.props.api)
      )
    ];

    return (
      <WithTooltip
        placement="top"
        trigger="click"
        tooltipShown={this.state.expanded}
        onVisibilityChange={this.onVisibilityChange}
        tooltip={<TooltipLinkList links={links} />}
        closeOnClick
      >
        <Button />
      </WithTooltip>
    );
  }
}

import downloadFile from './download-file';

window.saveCurrent = (title: string) => {
  const page2layers = document.createElement('script');
  page2layers.src =
    'https://unpkg.com/story2sketch@1.5.0/lib/browser/page2layers.bundle.js';
  page2layers.type = 'text/javascript';
  page2layers.onload = () => {
    const page = window.page2layers.getPage({
      title,
      width: 1920,
      height: 5000
    });

    page.layers = [
      window.page2layers.getSymbol({
        fixPseudo: true,
        removePreviewMargin: true
      })
    ];

    downloadFile(`${title}.asketch.json`, page);
  };

  document.head.appendChild(page2layers);
};

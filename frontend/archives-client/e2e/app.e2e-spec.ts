import { ArchivesClientPage } from './app.po';

describe('archives-client App', () => {
  let page: ArchivesClientPage;

  beforeEach(() => {
    page = new ArchivesClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

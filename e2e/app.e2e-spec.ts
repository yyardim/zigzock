import { ZigzockPage } from './app.po';

describe('zigzock App', function() {
  let page: ZigzockPage;

  beforeEach(() => {
    page = new ZigzockPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

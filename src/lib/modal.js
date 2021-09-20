export const Modal = {
  template: `<div class="dialog-overlay" id="dialog-overlay"></div>
        <div class="dialog-wrapper">
            <div class="dialog">
                <header>站点信息<span class="dialog-close" id="dialog-close"></span></header>
                <main>
                <div class="siteInfoInput">
                <span>名称：</span><input
                  type="text"
                  name="siteName"
                  id="siteName"
                  class="dialog-input"
                />
              </div>
              <div class="siteInfoInput">
              <span>地址：</span><input
                  type="text"
                  name="siteUrl"
                  id="siteUrl"
                  class="dialog-input"
                />
              </div>
              <div class="siteInfoInput">
              <span>描述：</span><input
                  type="text"
                  name="siteDesc"
                  id="siteDesc"
                  class="dialog-input"
                />
              </div>
                </main>
                <footer>
                    <button class="dialog-button" id="add-site">确定</button>
                    <button class="dialog-button" id="cancel-add-site">取消</button>
                </footer>
            </div>
        </div>`,
  el: null,
  init() {
    this.el = $(this.template);
    $("body").append(this.el);
    this.registerEventListeners();
  },
  render() {},
  registerEventListeners() {
    $("#dialog-close").click(() => {
      this.el.remove();
    });
    $("#add-site").click(() => {
      console.log(123);
    });
    $("#cancel-add-site").click(() => {
      this.el.remove();
    });
    $("#dialog-overlay").click(() => {
      this.el.remove();
    });
  },
  destroy() {
    this.el.remove();
    this.el = null;
  },
};

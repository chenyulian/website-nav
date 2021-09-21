export const Modal = {
  html: `<div class="dialog-overlay" id="dialog-overlay"></div>
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
    this.el = $(this.html);
    return this.el;
  },
  render() {
    $("body").append(this.el);
    this.registerEventListeners();
  },
  registerEventListeners() {
    $("#dialog-close").click(() => {
      this.unmount();
    });
    $("#add-site").click(() => {
      this.el.find("#add-site").trigger("addNewSite");
    });
    $("#cancel-add-site").click(() => {
      this.unmount();
    });
    $("#dialog-overlay").click(() => {
      this.unmount();
    });
  },
  unmount() {
    $("input#siteName").val("");
    $("input#siteUrl").val("");
    $("input#siteDesc").val("");
    this.el.remove();
  },
};

const $addIcon = $(".icon");

const saveToLocalStorage = function (siteListString) {
  localStorage.setItem("siteList", siteListString);
};
//从localStorage中获取数据
const getSiteListFromLocalStorage = function () {
  return localStorage.getItem("siteList");
};
let siteList;
if (getSiteListFromLocalStorage() === null) {
  siteList = [
    {
      logo: "A",
      title: "ANIMATE.CSS",
      desc: "Just-add-water CSS animations",
      link: "https://animate.style/",
    },
    {
      logo: "B",
      title: "BootCDN",
      desc: "前端开源项目 CDN 加速服务",
      link: "https://www.bootcdn.cn/",
    },
    {
      logo: "C",
      title: "CSS Tricks",
      desc: "CSS技巧",
      link: "https://css-tricks.com/",
    },
  ];
} else {
  siteList = JSON.parse(getSiteListFromLocalStorage());
}

// 渲染页面
const render = function (siteList) {
  // 清空节点
  $(".siteList li:not(:last)").remove();
  for (let i = 0; i < siteList.length; i++) {
    let $site = $(`<li>
                    <div class="site">
                      <div class="logo">${siteList[i].logo}</div>
                      <div class="title">${siteList[i].title}</div>
                      <div class="desc">${siteList[i].desc}</div>
                      <div class="close">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-baseline-close-px"></use>
                        </svg>
                      </div>
                    </div>
                   </li>`);
    $site.click(() => {
      //console.log(siteList[i].link);
      window.open(siteList[i].link, "_blank");
    });

    $site.on("click", ".close", (e) => {
      e.stopPropagation();
      // console.log(e);
      siteList.splice(i, 1);
      render(siteList);
      saveToLocalStorage(JSON.stringify(siteList));
    });

    $(".siteList li:last").before($site);
  }
};

// 保存到localStorage
let siteListString = JSON.stringify(siteList);

saveToLocalStorage(siteListString);

// 渲染列表
render(siteList);

$addIcon.on("click", () => {
  let eleDomTarget = document.getElementById("siteInfo");
  let objDomDialog;
  // 如果已经弹框打开过，就直接显示
  //if (objDomDialog) {
  //  objDomDialog.show();
  //} else {
  eleDomTarget.style.display = "block";
  objDomDialog = new Dialog({
    title: "站点信息",
    content: eleDomTarget,
    buttons: [
      {
        events: () => {
          let siteTitle = $("input#siteName").val();
          let siteUrl = $("input#siteUrl").val();
          let siteDesc = $("input#siteDesc").val();
          let logo = siteTitle[0] || siteUrl[0];
          siteList.push({
            logo: logo,
            title: siteTitle,
            desc: siteDesc,
            link: siteUrl,
          });
          render(siteList);
          siteListString = JSON.stringify(siteList);
          saveToLocalStorage(siteListString);

          $("input#siteName").val("");
          $("input#siteUrl").val("");
          $("input#siteDesc").val("");
          objDomDialog.hide();
        },
      },
      {
        events: () => {
          objDomDialog.hide();
        },
      },
    ],
  });
  //}
});

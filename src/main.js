import { Modal } from "./lib/modal.js";

const themes = [
  { base: "#F4D5B0", border: "#7B519A" },
  { base: "#F15A29", border: "#321C3B" },
  { base: "#561F74", border: "#84CEA4" },
  { base: "#591F75", border: "#B5B1FF" },
  { base: "#AAFFDD", border: "#8B98FF" },
];

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
                        <use xlink:href="#icon-delete1"></use>
                      </svg>
                      </div>
                    </div>
                   </li>`);
    $site.click(() => {
      window.open(siteList[i].link, "_blank");
    });

    $site.on("click", ".close", (e) => {
      e.stopPropagation();
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

// 创建模态框
const modal = Modal.init();
modal.find("#add-site").on("addNewSite", (e) => {
  let siteTitle = $("input#siteName").val();
  let siteUrl = $("input#siteUrl").val();
  let siteDesc = $("input#siteDesc").val();
  let logo = siteTitle[0] || siteUrl[0];

  console.log(siteTitle, siteUrl, siteDesc, logo);

  siteList.push({
    logo: logo,
    title: siteTitle,
    desc: siteDesc,
    link: siteUrl,
  });
  render(siteList);
  siteListString = JSON.stringify(siteList);
  saveToLocalStorage(siteListString);

  Modal.unmount();
});

$addIcon.on("click", () => {
  Modal.render();
});

$("input#filter").on("input", (e) => {
  render(
    siteList.filter(
      (i) => i.title.toUpperCase().indexOf(e.target.value.toUpperCase()) >= 0
    )
  );
});

let themeIndex = localStorage.getItem("themeIndex") || 0;
setTheme();
$("button#change-theme").on("click", () => {
  themeIndex++;
  setTheme();
  localStorage.setItem("themeIndex", themeIndex % 5);
});

function setTheme() {
  document.documentElement.style.setProperty(
    "--color-base",
    themes[themeIndex % 5].base
  );
  document.documentElement.style.setProperty(
    "--color-border",
    themes[themeIndex % 5].border
  );
}

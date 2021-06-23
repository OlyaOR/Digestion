class MyLib {
    constructor({playbtn, modal, closebtn}) {
      this.playbtn = playbtn;
      this.modal = modal;
      this.closebtn = closebtn;
    }
    static destroy(elem, event) {
        document.querySelector('.modal__content_video').contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), 'https://www.youtube.com');
        elem.style.display = 'none';
        document.removeEventListener("keydown", event);
    }
    init(code) {
        
        const play = document.querySelector(this.playbtn);
        const openmodal = document.querySelector(this.modal);
        openmodal.innerHTML = code;
        const close = openmodal.querySelector(this.closebtn);

        function escape(e) {
            if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
                MyLib.destroy(openmodal);
                MyLib.destroy(escape);
                MyLib.destroy(tab);
            }
        };
        function tab(e) {
            if (e.key === "Tab" && openmodal.contains(e.target)) {
                e.preventDefault();
            }
        };
        play.onclick = () => {
            openmodal.style.display = 'block';
            window.addEventListener("keydown", escape);
            window.addEventListener("keydown", tab);
        };
        document.onclick = (e) => {
            if (e.target === openmodal || e.target === close) {
                MyLib.destroy(openmodal);
                MyLib.destroy(escape);
                MyLib.destroy(tab);
            }
        };
    }
}
const htmlcode = `<div class="modal__content">
                    <button class="modal__content_btn">&times;</button>
                    <iframe class="modal__content_video" loading="lazy" src="https://www.youtube.com/embed/Cl_kXbhTi8k?enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>`;
new MyLib({playbtn: '.main__btn', modal:'.modal', closebtn:'.modal__content_btn'}).init(htmlcode);
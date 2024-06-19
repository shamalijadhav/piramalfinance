export default function decorate(block) {
    debugger;
    if(block.classList.contains('image-bg') || block.classList.contains('image-href')){
        if(block.classList.contains('image-bg-desktop')){

        }else if(block.classList.contains('image-href-desktop') || block.classList.contains('image-href-mobile')){
            if(block.classList.contains('image-href-desktop')){
                const blockImageDesktop = block.querySelector('div > picture');
                const hrefTag = document.createElement('a');
                const parentElementDesktop = block.querySelector('div > picture').parentElement;
                hrefTag.innerHTML = blockImageDesktop;
                parentElementDesktop.replaceWith(hrefTag);
                
            }
            if(block.classList.contains('image-href-mobile')){
                var blockImageMobile = "";
            }
        }
    }
}
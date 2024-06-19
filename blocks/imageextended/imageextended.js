export default function decorate(block) {
    debugger;
    if(block.classList.contains('image-bg') || block.classList.contains('image-href')){
        if(block.classList.contains('image-bg-desktop')){

        }else if(block.classList.contains('image-href-desktop') || block.classList.contains('image-href-mobile')){
            if(block.classList.contains('image-href-desktop')){
                var blockImageDesktop = block.querySelector('div > picture');
                var hrefTag = document.createElement('a');
            }
            if(block.classList.contains('image-href-mobile')){
                var blockImageMobile = "";
            }
        }
    }
}
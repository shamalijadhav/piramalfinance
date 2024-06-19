export default function decorate(block) {
    
  var newDiv = gettingImage(block);

  block.innerHTML(newDiv);


    //   if (block.classList.contains("image-bg")) {
        
    //     if (isDesktop.matches) {
    //       const blockImageDesktop = block.querySelector("div > picture");
    //       const hrefTag = document.createElement("a");
    //       const parentElementDesktop = block.querySelector("div > picture").parentElement;
    //       hrefTag.innerHTML = blockImageDesktop;
    //       parentElementDesktop.replaceWith(hrefTag);
    //     } else if (isMobile.matches) {
    //     }
    //   }
    //   if (block.classList.contains("image-a")) {
    //   }
    //   if (block.classList.contains("image-bg-a")) {
    //   }

}

function gettingImage(block){

    const isDesktop = window.matchMedia("(min-width: 900px)");
    const isMobile = window.matchMedia("(max-width: 768px)");

    // Getting Element
    const blockContainer = block.innerHTML.trim();

    // Div
    const blockDiv = document.createElement("div");

    // Div Inner HTMl
    blockDiv.innerHTML = blockContainer;

    // Div child
    const blockDivChild = blockDiv.children;

    // Picture
    const blockDesktopPic = blockDivChild.children[0].querySelector('picture');
    const blockMobilePic = blockDivChild.children[3].querySelector('picture');

    // Text
    const blockDesktopHref = blockDivChild.children[2].innerText.trim();
    const blockMobileHref = blockDivChild.children[6].innerText.trim();

    // A tag
    const createHref = document.createElement("a");

    a.href = blockDesktopHref;
    a.target = "_blank";
    a.innerHTML = blockDesktopPic;

    // Creating a DIV for desktop tag
    const createDivDesktop = document.createElement("div");
    if(isDesktop.matches){
        createDivDesktop.classList.add("image-href-desktop");
        createDivDesktop.innerHTML(createHref);
    }else if(isMobile.matches){
        createDivDesktop.classList.add("image-href-mobile");
        createDivDesktop.innerHTML(createHref);
    }

    return createDivDesktop;
    
} 

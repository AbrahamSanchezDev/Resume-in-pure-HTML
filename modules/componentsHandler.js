export default class ObjectHandler {

    curImages = [];

    defaultSrc = "";
    container;
    imageWidth = 50
    objType = "img";
    //Needs to be a function that takes a index
    onClick = () => { };

    constructor(defaultSrc, container, imageWidth, objType) {
        this.defaultSrc = defaultSrc;
        this.container = container;
        this.imageWidth = imageWidth;
        this.objType = objType;
    }
    //Show the needed amount of images
    ShowImages(total) {
        this.ShowCurImages(false);
        if (total <= this.curImages.length) {
            //show only the ones needed
            for (let i = 0; i < total; i++) {
                this.ShowComponent(this.curImages[i], true);

            }
            return;
        }
        else {
            //Add more images
            let needed = total - this.curImages.length;
            this.ShowCurImages(true);
            for (let i = 0; i < needed; i++) {
                this.AddImage();
            }
        }
    }
    ShowAllSrc(allSrc) {
        this.ShowImages(allSrc.length);
        for (let i = 0; i < allSrc.length; i++) {

            this.SetSrcTo(i, allSrc[i]);
        }
    }
    //Adds an image to the curImages
    AddImage() {
        var nImage = document.createElement(this.objType);
        nImage.style.width = this.imageWidth;
        nImage.style.margin = "auto";
        nImage.src = this.defaultSrc;
        this.container.appendChild(nImage);
        this.curImages.push(nImage);
        return nImage;
    }
    //shows or hides all images on the grid
    ShowCurImages(show) {
        this.curImages.forEach((img) => {
            this.ShowComponent(img, show);
        })
    }
    //Sets or Remove the listener to all the objects in the list
    SetAllListeners(add) {
        this.curImages.forEach(img => {
            this.SetListeners(img, add);
        })
    }
    //Sets a listener to the image so its clickable or not
    SetListeners(img, add) {
        if (add) {
            img.onclick = () => {
                const index = this.curImages.findIndex(im => im === img);
                if (onClick != null) {
                    this.onClick(index);
                }

            };
        }
        else {
            img.onclick = null;
        }
    }
    //Remove the listener from the object in the list
    RemoveListenerFrom(index) {
        this.curImages[index].onclick = null;
    }
    //Set the src of the object to default
    SetSrcToDefault(index) {
        this.curImages[index].src = this.defaultSrc;
    }
    //Sets the sre to the images at the given index
    SetSrcTo(index, src) {
        this.curImages[index].src = src;
    }
    //controls the visibility of the given component
    ShowComponent(img, show) {
        if (show) {
            img.style.display = "block";
        }
        else {
            img.style.display = "none";
        }
    }
}
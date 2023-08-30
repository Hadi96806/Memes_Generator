import React from "react"
import fileSaver from "file-saver"
export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = React.useState([])
    const [image, setImage] = React.useState("")
    const [selectedImage, setSelectedImage] = React.useState(null);

    React.useEffect(() => {
        fetch(meme.randomImage)
          .then(response => response.blob())
          .then(blob => {
            setImage(URL.createObjectURL(blob));
          })
          .catch(error => {
            console.error("Error fetching image:", error);
          });
      }, [meme]);
    

    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    

   const handleImageDownload = () => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = selectedImage?selectedImage:image
    const font =selectedImage?4:2
    img.onload = () => {
        const aspectRatio = img.width / img.height;
        canvas.width = img.width;
        canvas.height = img.height * aspectRatio;
        
        const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.height, canvas.width);
      // Apply styling to top text
    ctx.fillStyle = "white";
    ctx.font = `${font}rem impact, sans-serif`;
    ctx.textAlign = "center";
    ctx.textTransform = "uppercase";
    ctx.letterSpacing = 1;
    ctx.shadowColor = "#000";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 5;

    // Draw top text
    ctx.fillText(meme.topText, canvas.width / 2,canvas.height/18);

    // Apply styling to bottom text
    ctx.textBaseline = "bottom";
    ctx.font = `${font}rem impact, sans-serif`;
    ctx.textAlign = "center";
    ctx.textTransform = "uppercase";
    ctx.letterSpacing = 1;
    ctx.shadowColor = "#000";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 5;

    // Draw bottom text
    ctx.fillText(meme.bottomText, canvas.width / 2, canvas.height - 20);

      canvas.toBlob((blob) => {
        fileSaver.saveAs(blob, "edited-meme.png");
      });
    };
  };

  
  
    const handleImageChange = event => {
      const imageFile = event.target.files[0];
      setSelectedImage(URL.createObjectURL(imageFile));
    };

    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 
                </button>
               <button className="form--button"><input type="file" accept="image/*" onChange={handleImageChange} /></button> 
      
            </div>
            <div className="meme">
                <img src={selectedImage?selectedImage:meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            <button onClick={handleImageDownload} className="download">Download Edited Meme</button>
        </main>
    )
}
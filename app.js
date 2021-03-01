class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.currentKick = './sounds/kick-classic.wav';
        this.currentSnare = './sounds/snare-acoustic01.wav';
        this.currentHihat = './sounds/hihat-acoustic01.wav.wav';
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll('.mute');
        this.temoSlider = document.querySelector('.tempo-slider');

    }
    activePad(){
        this.classList.toggle("active");
    }
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //loop over pads
        activeBars.forEach(bar =>{
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            if(bar.classList.contains("active")){
                //check each sound
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.play();
                    this.kickAudio.currentTime = 0;
                }
                if(bar.classList.contains("snare-pad")){
                    this.snareAudio.play();
                    this.snareAudio.currentTime = 0;
                }
                if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.play();
                    this.hihatAudio.currentTime = 0;
                }
            }
        })
        this.index++;
    }
    start(){
        const interval = (60 / this.bpm) *1000;
        //check if it's playing
        if(this.isPlaying){
            //clear interval
            clearInterval(this.isPlaying);
            this.isPlaying=null; 
        }
        else{
            
            this.isPlaying = setInterval(()=> {
                this.repeat();
            }, interval);
        }
        
        
    }
    updateBtn(){
        if(!this.isPlaying){
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        }
        else{
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        }
    }
    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch(selectionName){
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        }
    }
    mute(e){
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle("active");
        if(e.target.classList.contains('active')){
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        }
        else{
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }

    }
    changeTempo(e){
        const tempoText = document.querySelector('.tempo-nr');
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value;
    }
    updateTempo(e){
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if(playBtn.classList.contains("active")){
            this.start();
        }

    }
}


const drumKit = new DrumKit();

//event listiner


drumKit.pads.forEach(pad =>{
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function() {
        this.style.animation = "";
    });
});

drumKit.playBtn.addEventListener('click', function(){
    drumKit.updateBtn();
    drumKit.start();
});


drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e){
        drumKit.changeSound(e);
    });
});
drumKit.muteBtns.forEach(btn =>{
    btn.addEventListener('click', function(e){
        drumKit.mute(e);
    })
});

drumKit.temoSlider.addEventListener('input' , function(e){
    drumKit.changeTempo(e);
});
drumKit.temoSlider.addEventListener('change' , function(e){
    drumKit.updateTempo(e);
});
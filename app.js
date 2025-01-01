new Vue({
    el: '#app',
    data: {
        effectType: 'ambient',
        duration: 5,
        complexity: 5,
        isGenerating: false
    },
    methods: {
        generateSound() {
            this.isGenerating = true;
            
            // Simulate sound generation
            setTimeout(() => {
                this.isGenerating = false;
                
                // Create an oscillator for demo purposes
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                // Set frequency based on effect type
                const frequencies = {
                    ambient: 220,
                    'sci-fi': 440,
                    nature: 330,
                    mechanical: 110
                };
                
                oscillator.frequency.value = frequencies[this.effectType];
                
                // Set volume based on complexity
                gainNode.gain.value = this.complexity / 20;
                
                // Start and stop the sound
                oscillator.start();
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + this.duration);
                
                setTimeout(() => {
                    oscillator.stop();
                    audioContext.close();
                }, this.duration * 1000);
            }, 1500);
        }
    }
}); 
new Vue({
    el: '#app',
    data: {
        isDragging: false,
        videoPreview: null,
        soundDescription: '',
        selectedFile: null
    },
    methods: {
        handleFileDrop(e) {
            this.isDragging = false;
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('video/')) {
                this.handleFile(file);
            } else {
                alert('Please upload a video file (MP4, MOV, or AVI)');
            }
        },
        handleFileSelect(e) {
            const file = e.target.files[0];
            if (file) {
                this.handleFile(file);
            }
        },
        handleFile(file) {
            if (file.size > 100 * 1024 * 1024) { // 100MB limit
                alert('File size must be less than 100MB');
                return;
            }
            
            const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload a valid video file (MP4, MOV, or AVI)');
                return;
            }
            
            this.selectedFile = file;
            this.videoPreview = URL.createObjectURL(file);
        }
    },
    beforeDestroy() {
        // Clean up video preview URL
        if (this.videoPreview) {
            URL.revokeObjectURL(this.videoPreview);
        }
    }
}); 
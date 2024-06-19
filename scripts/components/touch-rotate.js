AFRAME.registerComponent('touch-rotate', {
  schema: {
    rotationSpeed: { type: 'number', default: 1 }
  },
  init: function () {
    this.startX = 0;
    this.currentX = 0;
    this.isDragging = false;

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    this.el.addEventListener('touchstart', this.handleTouchStart);
    this.el.addEventListener('touchmove', this.handleTouchMove);
    this.el.addEventListener('touchend', this.handleTouchEnd);

    console.log('touch-rotate component initialized');
  },
  handleTouchStart: function (event) {
    if (event.touches.length === 1) {
      this.startX = event.touches[0].clientX;
      this.isDragging = true;
      console.log('Touch start detected. startX:', this.startX);
    }
  },
  handleTouchMove: function (event) {
    if (this.isDragging && event.touches.length === 1) {
      this.currentX = event.touches[0].clientX;
      const deltaX = this.currentX - this.startX;
      const rotation = this.el.getAttribute('rotation');
      rotation.y += deltaX * this.data.rotationSpeed * 0.1;
      this.el.setAttribute('rotation', rotation);
      this.startX = this.currentX;

      console.log('Touch move detected. currentX:', this.currentX, 'deltaX:', deltaX, 'new rotation:', rotation.y);
    }
  },
  handleTouchEnd: function (event) {
    this.isDragging = false;
    console.log('Touch end detected.');
  },
  remove: function () {
    this.el.removeEventListener('touchstart', this.handleTouchStart);
    this.el.removeEventListener('touchmove', this.handleTouchMove);
    this.el.removeEventListener('touchend', this.handleTouchEnd);

    console.log('touch-rotate component removed');
  }
});

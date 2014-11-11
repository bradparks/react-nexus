module.exports = function(R) {
  return (params) => {
    class Fullscreen extends R.App.Plugin {
      constructor({ flux, window, req }) {
        super.apply(this, arguments);
        if(window) {
          // Client-only init
        }
        else {
          // Server-only init
        }
      }

      getDisplayName() {
        return 'Fullscreen';
      }
    }

    return Fullscreen;
  };
};

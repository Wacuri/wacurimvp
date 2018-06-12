if (__CLIENT__) {
  navigator.share = navigator.share || (function(){
      if (navigator.share) {
          return navigator.share;
      }

    let android = navigator.userAgent.match(/Android/i);
      let ios = navigator.userAgent.match(/iPhone|iPad|iPod/i);
    let isDesktop = !(ios || android); // on those two support "mobile deep links", so HTTP based fallback for all others.

    // sms on ios 'sms:;body='+payload, on Android 'sms:?body='+payload
    let shareUrls = {
        whatsapp: payload => (isDesktop ? 'https://api.whatsapp.com/send?text=' : 'whatsapp://send?text=') + payload,
        telegram: payload => (isDesktop ? 'https://telegram.me/share/msg?url='+location.host+'&text=' : 'tg://msg?text=') + payload,
        facebook: (payload, fbid, url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        email:    (payload, title) => 'mailto:?subject='+title+'&body='+payload,
      sms:      payload => 'sms:/&body='+payload
    };

    class WebShareUI{
      /*async*/
      _init(){
        if(this._initialized) return Promise.resolve();
        this._initialized = true;

        const template = `
        <div class="web-share" style="display: none">
          <div class="web-share-container web-share-grid">
              <div class="web-share-title">SHARE VIA</div>
            <a target='_blank' class="web-share-item web-share-facebook">
                  <div class="fa fa-facebook-official fa-3x"></div>
                  <div class="web-share-item-desc">Facebook</div>
              </a>
              <a class="web-share-item web-share-email">
              <div class="fa fa-envelope fa-3x"></div>
              <div class="web-share-item-desc">Email</div>
            </a>
              <a class="web-share-item web-share-sms">
              <div class="fa fa-commenting fa-3x"></div>
              <div class="web-share-item-desc">SMS</div>
            </a>
            <a class="web-share-item web-share-copy">
                  <div class="fa fa-clone fa-3x"></div>
                  <div class="web-share-item-desc">Copy</div>
              </a>
          </div>
          <div class="web-share-container web-share-cancel">Cancel</div>
        </div>
        `;

        const el = document.createElement('div');
        el.innerHTML = template;

        this.$root     = el.querySelector('.web-share');
        this.$whatsapp = el.querySelector('.web-share-whatsapp');
        this.$facebook = el.querySelector('.web-share-facebook');
        this.$telegram = el.querySelector('.web-share-telegram');
        this.$email    = el.querySelector('.web-share-email');
        this.$sms      = el.querySelector('.web-share-sms');
        this.$copy     = el.querySelector('.web-share-copy');
        this.$copy.onclick = () => this._copy();
        this.$root.onclick = () => this._hide();
        this.$root.classList.toggle('desktop', isDesktop);

        document.body.appendChild(el);
      }

      _setPayload(payloadObj){
        let payload = payloadObj.text + ' ' + payloadObj.url;
        let title = payloadObj.title;
        let facebookId = payloadObj.facebookId || '158651941570418';
          this.url = payloadObj.url;
        payload = encodeURIComponent(payload);
        title = encodeURIComponent(title);
        this.$whatsapp && (this.$whatsapp.href = shareUrls.whatsapp(payload));
        this.$facebook.href = shareUrls.facebook(payload, facebookId, payloadObj.url);
        this.$telegram && (this.$telegram.href = shareUrls.telegram(payload));
        this.$email.href = shareUrls.email(payload, title);
        this.$sms.href = shareUrls.sms(payload);
      }

      _copy(){
              // A <span> contains the text to copy
              const span = document.createElement('span');
              span.textContent = this.url;
              span.style.whiteSpace = 'pre'; // Preserve consecutive spaces and newlines

              // Paint the span outside the viewport
              span.style.position = 'absolute';
              span.style.left = '-9999px';
              span.style.top = '-9999px';

              const win = window;
              const selection = win.getSelection();
              win.document.body.appendChild(span);

              const range = win.document.createRange();
              selection.removeAllRanges();
              range.selectNode(span);
              selection.addRange(range);

              let success = false;
              try {
                  success = win.document.execCommand('copy');
              } catch (err) {}

              selection.removeAllRanges();
              span.remove();

              return success;
      }

      /*async*/
      show(payloadObj){
        this._init()
        clearTimeout(this._hideTimer);
        this._setPayload(payloadObj);
        this.$root.style.display = 'flex';
        this.$root.offsetWidth; // style update
        this.$root.style.background = 'rgba(0,0,0,.4)';
        document.querySelectorAll('.web-share-container').forEach(el => {
            el.style.transform = 'translateY(0)';
            el.style.opacity = 1;
        });
      }

      _hide(){
              this.$root.style.background = null;
              document.querySelectorAll('.web-share-container').forEach(el => {
                  el.style.transform = null;
                  el.style.opacity = null;
              });
              this._hideTimer = setTimeout(() => this.$root.style.display = null, 400);
      }
    }

    const shareUi = new WebShareUI();

    /* async */
    return data => shareUi.show(data);

  }());

}

document.addEventListener('DOMContentLoaded', () => {
  // 1. モバイルメニューの開閉
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    const setMenuOpen = (open) => {
      navMenu.classList.toggle('active', open);
      mobileMenuBtn.setAttribute('aria-expanded', open);
      mobileMenuBtn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    };

    mobileMenuBtn.addEventListener('click', () => {
      setMenuOpen(!navMenu.classList.contains('active'));
    });

    // メニュー項目クリックで自動的に閉じる
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    // メニューの外側をタップしたら閉じる
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        setMenuOpen(false);
      }
    });

    // PC幅に戻ったら閉じた状態にリセット
    window.matchMedia('(min-width: 1201px)').addEventListener('change', (e) => {
      if (e.matches) setMenuOpen(false);
    });
  }

  // 2. 施工実績ギャラリーの絞り込みフィルター
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter || (filter === 'tomb' && (category === 'japanese' || category === 'western'))) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 3. 画像拡大モーダル (Lightbox)
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalClose = document.getElementById('modalClose');

  if (modal && modalImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          modalImg.src = img.src;
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 4. お問い合わせフォーム送信時のUIフィードバック
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('お問い合わせありがとうございます。\n（デモ送信：お預かりした内容は大切に確認いたします）');
      contactForm.reset();
    });
  }
});

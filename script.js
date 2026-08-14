document.addEventListener("DOMContentLoaded", function () {
  // --- DOM Elements ---
  const smartBtn = document.getElementById("smart-download-btn");
  const btnText = document.getElementById("btn-text");
  const osMsg = document.getElementById("os-detect-msg");
  const linkIos = document.getElementById("link-ios");
  const linkAndroid = document.getElementById("link-android");
  const copyBtn = document.getElementById("copy-btn");

  // --- App Store Links ---
  const IOS_URL = "https://apps.apple.com/my/app/sifututor-tutors-a-tap-away/id6615067210?l=ms";
  const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.sifuparent&pcampaignid=web_share";

  // --- OS Detection Logic ---
  function getMobileOS() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check for iOS (iPhone, iPad, iPod)
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }
    
    // Check for Android
    if (/android/i.test(userAgent)) {
      return "Android";
    }

    // Check for macOS (sometimes iPads masquerade as Macintosh)
    if (/Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1) {
      return "iOS";
    }

    return "Unknown";
  }

  // --- Update UI based on OS ---
  const os = getMobileOS();

  if (os === "iOS") {
    // Customize main button for iOS
    smartBtn.href = IOS_URL;
    btnText.textContent = "Muat Turun di App Store";
    smartBtn.innerHTML = `<i class="fa-brands fa-apple"></i> <span>Muat Turun di App Store</span>`;
    osMsg.textContent = "Dikesan untuk iOS / iPhone 📱";
    
    // Highlight iOS fallback link
    linkIos.classList.add("highlight");
  } else if (os === "Android") {
    // Customize main button for Android
    smartBtn.href = ANDROID_URL;
    btnText.textContent = "Muat Turun di Google Play";
    smartBtn.innerHTML = `<i class="fa-brands fa-google-play"></i> <span>Muat Turun di Google Play</span>`;
    osMsg.textContent = "Dikesan untuk Android 🤖";
    
    // Highlight Android fallback link
    linkAndroid.classList.add("highlight");
  } else {
    // Desktop or other OS
    smartBtn.href = "#smart-download-card"; // Scroll/stay on card
    smartBtn.style.cursor = "default";
    smartBtn.innerHTML = `<i class="fa-solid fa-arrow-down"></i> <span>Pilih Stor Aplikasi di Bawah</span>`;
    osMsg.textContent = "Sila pilih jenis peranti anda di bawah 👇";
    
    // Disable primary hover effect since it's just an indicator on desktop
    smartBtn.addEventListener("click", function(e) {
      e.preventDefault();
      // Smooth scroll to store buttons
      document.querySelector(".fallback-links").scrollIntoView({ behavior: 'smooth' });
    });
  }

  // --- Copy/Share Link Logic ---
  copyBtn.addEventListener("click", function () {
    const pageUrl = window.location.href;

    // Use modern navigator.clipboard API if available
    if (navigator.clipboard) {
      navigator.clipboard.writeText(pageUrl)
        .then(() => showSuccessState())
        .catch(err => fallbackCopy(pageUrl));
    } else {
      fallbackCopy(pageUrl);
    }
  });

  function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";  // Avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showSuccessState();
    } catch (err) {
      console.error('Gagal menyalin pautan: ', err);
    }
    document.body.removeChild(textArea);
  }

  function showSuccessState() {
    const origHtml = copyBtn.innerHTML;
    copyBtn.innerHTML = `<i class="fa-solid fa-check" style="color: var(--primary);"></i> <span>Disalin!</span>`;
    copyBtn.style.borderColor = "var(--primary)";
    
    setTimeout(() => {
      copyBtn.innerHTML = origHtml;
      copyBtn.style.borderColor = "var(--glass-border)";
    }, 2000);
  }
});

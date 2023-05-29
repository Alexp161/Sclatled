const banners = document.querySelectorAll('.adaptivSlayderlasekun .banner');
const indicators = document.querySelectorAll('.banner__indicator');
const bannerCount = banners.length;
let currentBannerIndex = 0;
let bannerInterval;

function showBanner(targetIndex, direction) {
  const currentBanner = banners[currentBannerIndex];
  const nextBanner = banners[targetIndex];

  nextBanner.style.transition = 'none';
  nextBanner.style.transform = `translateX(${100 * direction}%)`;

  setTimeout(() => {
    currentBanner.style.transition = 'transform 1s ease-in-out';
    currentBanner.style.transform = `translateX(${-100 * direction}%)`;
    nextBanner.style.transition = 'transform 1s ease-in-out';
    nextBanner.style.transform = `translateX(0%)`;
    currentBannerIndex = targetIndex;
    updateIndicators();
  }, 50);
}

function updateIndicators() {
  indicators.forEach((indicator, index) => {
    if (index === currentBannerIndex) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    if (index !== currentBannerIndex) {
      clearInterval(bannerInterval);
      const direction = index < currentBannerIndex ? -1 : 1;
      showBanner(index, direction);
      bannerInterval = setInterval(autoChangeBanner, 7000);
    }
  });
});

function autoChangeBanner() {
  let nextIndex = currentBannerIndex + 1;
  if (nextIndex >= bannerCount) {
    nextIndex = 0;
  }
  const direction = 1;
  showBanner(nextIndex, direction);
}

function init() {
  banners.forEach((banner, index) => {
    if (index === 0) {
      banner.style.transform = 'translateX(0%)';
    } else {
      banner.style.transform = 'translateX(-100%)';
    }
  });
  updateIndicators();
  bannerInterval = setInterval(autoChangeBanner, 7000);
}

document.addEventListener('DOMContentLoaded', function() {
  init();
});


$(document).ready(function() {
  const modal = $('.modal-application');
  const modalContent = $('.modal-content');

  // Открытие модального окна
  $('.btn-open-modal').click(function(e) {
    e.stopPropagation();
    $('.modal-overlay').fadeIn();
    modal.show();
    $('body').css('overflow', 'hidden');
  });

  // Закрытие модального окна при клике на кнопку "Назад"
  $('.btn.btn_light.modal-close').click(function() {
    $('.modal-overlay').fadeOut();
    modal.hide();
    $('body').css('overflow', 'auto');
  });

  // Закрытие модального окна при клике на фон
  $('.modal-overlay').click(function(e) {
    if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0) {
      closeModal();
    }
  });

  // Закрытие модального окна и сброс флага overflow
  function closeModal() {
    $('.modal-overlay').fadeOut();
    modal.hide();
    $('body').css('overflow', 'auto');
  }
});

function validateForm() {
  const emailInput = $('#email');
  const errorMessage = $('.error-message');
  const requiredFieldsMessage = $('.required-fields-message');

  if (!validateEmailInput(emailInput)) {
    emailInput.addClass('error');
    errorMessage.show();
    requiredFieldsMessage.show();
    return false;
  }

  emailInput.removeClass('error');
  errorMessage.hide();
  requiredFieldsMessage.hide();
  return true;
}

const emailInput = document.getElementById('email');
const errorMessage = document.getElementById('error-message');

// Обработчик при возникновении ошибки
function showError() {
  errorMessage.style.display = 'block';
  emailInput.classList.add('highlight');
}

// Обработчик при исправлении ошибки
function hideError() {
  errorMessage.style.display = 'none';
  emailInput.classList.remove('highlight');
}

// Привязать обработчики к событиям валидации
emailInput.addEventListener('invalid', showError);
emailInput.addEventListener('input', hideError);


import * as gulpFunctions from './modules/functions.js';
gulpFunctions.isWebp();

//======Modal=========

//======Swiper=========
import Swiper, { Navigation, Pagination, EffectFade, Scrollbar, Thumbs, Autoplay } from 'swiper';
import Accordion from 'accordion-js';
import MicroModal from 'micromodal';

var swiper = new Swiper('.item-view__thumbs-swiper', {
    spaceBetween: 7,
    slidesPerView: 4,
    // slidesPerGroup: 4,
    freeMode: true,
    watchSlidesProgress: true,
    direction: 'vertical',
});
var swiper2 = new Swiper('.item-view__slider', {
    modules: [Navigation, Pagination, Thumbs],
    navigation: {
        nextEl: '.item-view__next',
        prevEl: '.item-view__prev',
    },
    pagination: {
        el: '.item-view__pagination',
        type: 'custom',
        renderCustom: function (swiper, current, total) {
            let indT = total >= 10 ? total : `${total}`;
            let indC = current >= 10 ? current : `${current}`;
            return `<span>${indC}</span> <span>из</span> <span>${indT}</span>`;
        },
    },
    spaceBetween: 10,
    thumbs: {
        swiper: swiper,
    },
});

function setActiveCatalogView() {
    let catalogRow = document.querySelector('.catalog__view-row');
    let catalogGrid = document.querySelector('.catalog__view-grid');
    let catalogItem = document.querySelectorAll('.catalog-item');
    let catalogItems = document.querySelector('.catalog__items');
    let catalogViewConfigurationBtns = document.querySelectorAll('.catalog-item__content-configuration-item');
    if (catalogRow && catalogGrid) {
        catalogRow.addEventListener('click', function (event) {
            event.preventDefault();

            catalogGrid.classList.remove('view-active');
            catalogRow.classList.add('view-active');

            if (catalogRow.classList.contains('view-active')) {
                catalogItems.classList.remove('catalog__items-flex');
                catalogItem.forEach((e) => {
                    e.classList.remove('catalog-item-flex');
                });
            }
        });
        catalogGrid.addEventListener('click', function (event) {
            event.preventDefault();
            catalogRow.classList.remove('view-active');
            catalogGrid.classList.add('view-active');
            if (catalogGrid.classList.contains('view-active')) {
                catalogItems.classList.add('catalog__items-flex');
                catalogItem.forEach((e) => {
                    e.classList.add('catalog-item-flex');
                });
            }
        });
    }
    let filterItemListing = document.querySelectorAll('.filter-item');
    filterItemListing.forEach(function (el) {
        el.addEventListener('click', () => {
            filterItemListing.forEach((el) => el.classList.remove('filter-active'));
            el.classList.add('filter-active');
        });
    });

    catalogViewConfigurationBtns.forEach((el) => {
        el.addEventListener('click', () => {
            catalogViewConfigurationBtns.forEach((el) =>
                el.classList.remove('catalog-item__content-configuration-item--active')
            );
            el.classList.add('catalog-item__content-configuration-item--active');
        });
    });
}
setActiveCatalogView();
let comparePageTableTabs = document.querySelectorAll('.switch-main');
let comparePageCardRows = document.querySelectorAll('.row-main');
comparePageTableTabs.forEach((el, i) => {
    el.addEventListener('click', () => {
        comparePageCardRows.forEach((e) => e.classList.remove('row--sticky--active'));
        comparePageCardRows[i].classList.add('row--sticky--active');
    });
});

//------------------------------------------------------
const catalogItemColorBox = document.querySelectorAll('.catalog-item__color');

catalogItemColorBox.forEach((el, i) => {
    let colors = el.querySelectorAll('.catalog-item__available');
    colors.forEach((el, colorIndex) => {
        el.addEventListener('click', () => {
            colors.forEach((el) => el.classList.remove('catalog-item__available--active'));
            el.classList.add('catalog-item__available--active');
            let closestSwiper = el.closest('.catalog-item').querySelectorAll('.swiper-slide');
            closestSwiper.forEach((elem) => {
                let imgs = elem.querySelectorAll('img');

                imgs.forEach((el) => el.classList.add('swiper-wrapper--hidable-img'));
                imgs[colorIndex].classList.remove('swiper-wrapper--hidable-img');
            });
        });
    });
});

const catalogLike = document.querySelectorAll('.catalog-item__like');
const catalogCompare = document.querySelectorAll('.catalog-item__compare-add');

catalogLike.forEach((el) => {
    el.addEventListener('click', () => {
        el.classList.toggle('catalog-item__like--active');
    });
});

catalogCompare.forEach((el) => {
    el.addEventListener('click', () => {
        el.classList.toggle('catalog-item__compare-add--active');
    });
});

let compareTabsBox = document.querySelector('.compare__tabs-switch-box');
let mobileMainSwitshes = document.querySelectorAll('.switch-mobile');
let mobileMainRows = document.querySelectorAll('.row-main-mobile');

mobileMainSwitshes.forEach((el, i) => {
    el.addEventListener('click', () => {
        compareTabsBox.innerHTML = el.innerHTML;
        mobileMainRows.forEach((el) => el.classList.remove('row-main-mobile--active'));
        mobileMainRows[i].classList.add('row-main-mobile--active');
    });
});

function loginModal() {
    let loginEmail = document.querySelector('.login_modal-input-email');
    let loginPass = document.querySelector('.login_modal-input-pass');
    let loginEmailInput = document.querySelector('.login_modal-input-email  input');
    let loginEmailLabel = document.querySelector('.login_modal-input-email  span');
    let loginPassInput = document.querySelector('.login_modal-input-pass  input');
    let loginPassLabel = document.querySelector('.login_modal-input-pass  span');
    let loginHide = document.querySelector('.login_modal-input-hide');
    let loginShow = document.querySelector('.login_modal-input-show');

    loginEmailInput.addEventListener('input', () => {
        if (loginEmailInput.value.length > 0) {
            loginEmailLabel.classList.add('active');
        } else {
            loginEmailLabel.classList.remove('active');
        }
    });
    loginPassInput.addEventListener('input', () => {
        if (loginPassInput.value.length > 0) {
            loginPassLabel.classList.add('active');
        } else {
            loginPassLabel.classList.remove('active');
        }
    });

    loginEmail.addEventListener('click', (e) => {
        e.stopPropagation();
        loginEmailInput.focus();
    });
    loginPass.addEventListener('click', (e) => {
        e.stopPropagation();
        loginPassInput.focus();
    });

    loginHide.addEventListener('click', (e) => {
        e.stopPropagation();
        loginHide.classList.remove('active');
        loginShow.classList.add('active');
        loginPassInput.type = 'text';
    });
    loginShow.addEventListener('click', (e) => {
        e.stopPropagation();
        loginShow.classList.remove('active');
        loginHide.classList.add('active');
        loginPassInput.type = 'password';
    });
}
loginModal();

function headerFunction() {
    const slides = document.querySelectorAll('.header_swiper_slide-item');

    const menuItems = document.querySelectorAll('.menu_item'),
        swiperHeader = document.querySelector('.swiper.headerSwiperCategories');
    let mobileMenuSidebarArrow = document.querySelector('.mobile__menu-sidebar-arrow');
    let mobileMenuSidebarCross = document.querySelector('.mobile__menu-sidebar-cross');
    let mobileMenuSidebar = document.querySelector('.mobile__menu-sidebar');
    let mobileMenuCatalogBtn = document.querySelector('.mobile__menu_item-first');

    let search = document.querySelector('.header_search'),
        searchInput = search.querySelector('input'),
        dropDown = search.querySelector('.search_dropdown'),
        overflowBody = document.querySelector('.overflow-black'),
        searchBtn = search.querySelector('.search__btn'),
        cross = document.querySelector('.cross');
    let headerSelect = document.querySelector('.select'),
        selectDropDown = headerSelect.querySelector('.header_select-dropdown');
    let mobileMenuCross = document.querySelector('.mobile__menu_cross');
    let mobileMenu = document.querySelector('.mobile__menu');
    let headerBurger = document.querySelector('.header_burger');
    let headerMenu = document.querySelector('.header_menu');

    let arrowRightHeader = document.querySelectorAll('.header_arrow_right');
    let arrowLeftHeader = document.querySelectorAll('.header_arrow_left');

    let userLogin = document.querySelector('.--user--login');
    let userLoginBtn = document.querySelector('.login_modal-sign-in-btn');

    userLoginBtn.addEventListener('click', () => {
        userLogin.classList.add('--user--login--active');
    });

    let swiperHeaderInitilization = new Swiper('.headerSwiperCategories', {});

    menuItems.forEach((item, index) => {
        item.addEventListener('mouseover', () => {
            swiperHeader.classList.add('active');
        });
        item.addEventListener('mouseover', () => {
            swiperHeaderInitilization.slideTo(index);
            menuItems.forEach((menuItem) => {
                menuItem.classList.remove('active');
            });
            item.classList.add('active');

            if (!swiperHeaderInitilization.isEnd) {
                arrowRightHeader[0].classList.add('visible');
                arrowRightHeader[0].classList.remove('hidden');
            }
            if (!swiperHeaderInitilization.isBeginning) {
                arrowLeftHeader[0].classList.add('visible');
                arrowLeftHeader[0].classList.remove('hidden');
            }
            if (swiperHeaderInitilization.isEnd) {
                arrowRightHeader[0].classList.add('hidden');
                arrowRightHeader[0].classList.remove('visible');
            }
            if (swiperHeaderInitilization.isBeginning) {
                arrowLeftHeader[0].classList.add('hidden');
                arrowLeftHeader[0].classList.remove('visible');
            }
        });
    });

    swiperHeader.addEventListener('mouseleave', function () {
        this.classList.remove('active');
        menuItems.forEach((elem) => elem.classList.remove('active'));
    });
    document.querySelector('.menu_wrapper').addEventListener('mouseleave', () => {
        swiperHeader.classList.remove('active');
        menuItems.forEach((elem) => elem.classList.remove('active'));
    });

    selectDropDown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    search.addEventListener('click', function () {
        search.classList.add('active');
        dropDown.classList.add('active');
        overflowBody.classList.add('active');
        searchBtn.classList.add('active');
        headerSelect.classList.remove('active');
        selectDropDown.classList.remove('active');
        cross.classList.add('active');
        document.body.classList.add('disable-scroll');
    });

    overflowBody.addEventListener('click', () => {
        search.classList.remove('active');
        dropDown.classList.remove('active');
        overflowBody.classList.remove('active');
        searchBtn.classList.remove('active');
        headerSelect.classList.remove('active');
        selectDropDown.classList.remove('active');
        cross.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('disable-scroll');
    });
    cross.addEventListener('click', function (e) {
        e.stopPropagation();
        search.classList.remove('active');
        dropDown.classList.remove('active');
        overflowBody.classList.remove('active');
        searchBtn.classList.remove('active');
        this.classList.remove('active');
        document.body.classList.remove('disable-scroll');
    });

    headerSelect.addEventListener('click', () => {
        headerSelect.classList.toggle('active');
        selectDropDown.classList.toggle('active');
        overflowBody.classList.toggle('active');
        search.classList.remove('active');
        searchBtn.classList.remove('active');
        dropDown.classList.remove('active');
        document.body.classList.add('disable-scroll');
    });

    headerBurger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        overflowBody.classList.add('active');
        document.body.classList.add('disable-scroll');
    });
    mobileMenuCross.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        overflowBody.classList.remove('active');
        document.body.classList.remove('disable-scroll');
    });
    document.querySelector('.header_select-dropdown-cross').addEventListener('click', () => {
        dropDown.classList.remove('active');
        overflowBody.classList.remove('active');
        headerSelect.classList.remove('active');
        selectDropDown.classList.remove('active');
        document.body.classList.remove('disable-scroll');
    });

    mobileMenuSidebarArrow.addEventListener('click', () => {
        mobileMenuSidebar.classList.remove('active');
        document.body.classList.remove('disable-scroll');
    });
    mobileMenuSidebarCross.addEventListener('click', () => {
        mobileMenuSidebar.classList.remove('active');
        document.body.classList.remove('disable-scroll');
    });

    swiperHeader.style.top = `${headerMenu.offsetHeight}px`;

    mobileMenuCatalogBtn.addEventListener('click', () => {
        mobileMenuSidebar.classList.add('active');
    });

    let selectCountriesColumns = document.querySelectorAll('.header_select-dropdown-countries-item');
    let selectCountriesColumnMob = document.querySelector('.header_select-dropdown-countries-mob');

    for (let i = 1; i <= 100; i++) {
        if (i > Math.floor(100 / 3) && i <= Math.floor(100 / 3) * 2) {
            selectCountriesColumns[1].innerHTML += `<span class="item-country">${i}</span>`;
        }
        if (i > Math.floor(100 / 3) * 2) {
            selectCountriesColumns[2].innerHTML += `<span class="item-country">${i}</span>`;
        }
        if (i <= Math.floor(100 / 3)) {
            selectCountriesColumns[0].innerHTML += `<span class="item-country">${i}</span>`;
        }
    }
    for (let i = 1; i <= 100; i++) {
        selectCountriesColumnMob.innerHTML += `<span class="item-country">${i}</span>`;
    }
    let mobileMenuSelect = document.querySelector('.mobile_menu-select'),
        mobileMenuSelectCross = mobileMenuSelect.querySelector('.header_select-dropdown-cross');
    mobileMenuSelect.addEventListener('click', () => {
        mobileMenuSelect.classList.add('active');
    });
    mobileMenuSelectCross.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenuSelect.classList.remove('active');
    });

    let headerMobileSearchBox = document.querySelector('.mobile_search-box'),
        headerMobileSearch = document.querySelector('.mobile_search'),
        headerMobileSearchArrow = headerMobileSearch.querySelector('.mobile_search-arrow-box'),
        headerMobileSearchButton = headerMobileSearch.querySelector('.mobile_search-box-button'),
        headerMobileSearchWrapper = document.querySelector('.mobile_search-wrapper');

    headerMobileSearchBox.addEventListener('click', (e) => {
        e.stopPropagation();
        headerMobileSearchArrow.classList.add('active');
        headerMobileSearchButton.classList.add('active');
        headerMobileSearch.classList.add('active');
        headerMobileSearchWrapper.classList.add('active');
    });
    headerMobileSearchArrow.addEventListener('click', () => {
        headerMobileSearchArrow.classList.remove('active');
        headerMobileSearchButton.classList.remove('active');
        headerMobileSearch.classList.remove('active');
        headerMobileSearchWrapper.classList.remove('active');
    });

    arrowRightHeader.forEach((el, i) => {
        el.addEventListener('click', () => {
            swiperHeaderInitilization.slideNext(600, true);
            if (!swiperHeaderInitilization.isBeginning) {
                arrowLeftHeader[i].classList.add('visible');
                arrowLeftHeader[i].classList.remove('hidden');
            }
            if (swiperHeaderInitilization.isEnd) {
                el.classList.remove('visible');
                el.classList.add('hidden');
            }
        });
    });

    arrowLeftHeader.forEach((el, i) => {
        el.addEventListener('click', () => {
            swiperHeaderInitilization.slidePrev(600, true);
            if (!swiperHeaderInitilization.isEnd) {
                arrowRightHeader[i].classList.add('visible');
                arrowRightHeader[i].classList.remove('hidden');
            }
            if (swiperHeaderInitilization.isBeginning) {
                el.classList.remove('visible');
                el.classList.add('hidden');
            }
        });
    });

    let mobileMenuSidebarCategoryBtns = document.querySelectorAll('.mobile__menu-sidebar--item');
    let mobileMenuSidebarCategoryItems = document.querySelectorAll('.sidebar_category-items');
    let itemsCatalogSidebar = document.querySelector('.items_catalog-sidebar');
    let mobileMenuSidebarCatalogCross = document.querySelector('.mobile__menu-sidebar-catalog-cross');
    let mobileMenuSidebarCatalogArrow = document.querySelector('.mobile__menu-sidebar-catalog-arrow');

    mobileMenuSidebarCategoryBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            itemsCatalogSidebar.classList.add('active');
            mobileMenuSidebarCategoryItems.forEach((elem) => {
                elem.classList.remove('sidebar_category-items-active');
            });
            mobileMenuSidebarCategoryItems[index].classList.add('sidebar_category-items-active');
        });
    });
    mobileMenuSidebarCatalogArrow.addEventListener('click', () => {
        itemsCatalogSidebar.classList.remove('active');
    });
    mobileMenuSidebarCatalogCross.addEventListener('click', () => {
        itemsCatalogSidebar.classList.remove('active');
    });
}
headerFunction();

let itemPage = document.querySelector('.item-view');
// if (window.location.pathname == '/item-page.html') {
function itemViewPageFunction() {
    //--------------tabs----------------
    let tab = function () {
        let tabActive = document.querySelectorAll('.item-view__tab'),
            tabContent = document.querySelectorAll('.tab-box'),
            tabName;

        tabActive.forEach((item) => {
            item.addEventListener('click', selectTabNav);
        });

        function selectTabNav() {
            tabActive.forEach((item) => {
                item.classList.remove('item-view__tab--active');
            });

            this.classList.add('item-view__tab--active');
            tabName = this.getAttribute('data-tab-name');
            selectTabContent(tabName);
        }

        function selectTabContent(tabName) {
            tabContent.forEach((item) => {
                item.classList.contains(tabName)
                    ? item.classList.add('tab-box--active')
                    : item.classList.remove('tab-box--active');
            });
        }
    };
    tab();

    const brandsBtn = document.querySelectorAll('.filters__item-brands');

    brandsBtn.forEach((e) => {
        e.addEventListener('click', function () {
            e.classList.toggle('filters__item-brands--active');
        });
    });
    if (document.querySelector('.reviews__rating')) {
        $(function () {
            $('.reviews__rating').rateYo({
                starWidth: '16px',
                rating: 4,
                ratedFill: '#30CA51',
                normalFill: '#BFC7D2',
            });

            $('.modal-reviews__rating').rateYo({
                starWidth: '23px',
                rating: 4,
                ratedFill: '#30CA51',
                normalFill: '#BFC7D2',
            });
        });
    }

    const compareBtn = document.querySelector('.item-view__compare');
    const compareBtnLabel = document.querySelector('.item-view__label');
    if (compareBtn) {
        let compareTimeout;
        compareBtn.addEventListener('click', function () {
            compareBtn.classList.toggle('item-view__compare--active');
            if (compareBtn.classList.contains('item-view__compare--active')) {
                compareBtnLabel.classList.add('active');
            } else {
                compareBtnLabel.classList.remove('active');
            }
        });
        compareBtn.addEventListener('mouseleave', () => {
            if (compareBtn.classList.contains('item-view__compare--active')) {
                compareTimeout = setTimeout(() => {
                    compareBtnLabel.classList.remove('active');
                }, 600);
            } else {
                compareBtnLabel.classList.remove('active');
            }
        });
        compareBtn.addEventListener('mouseover', () => {
            if (!compareBtn.classList.contains('item-view__compare--active')) {
                clearTimeout(compareTimeout);
                compareBtnLabel.classList.remove('active');
            }
            if (compareBtn.classList.contains('item-view__compare--active')) {
                clearTimeout(compareTimeout);
                compareBtnLabel.classList.add('active');
            }
        });

        compareBtnLabel.addEventListener('mouseover', () => {
            if (compareBtnLabel.classList.contains('active')) {
                clearTimeout(compareTimeout);
                compareBtnLabel.classList.add('active');
            }
        });
        compareBtnLabel.addEventListener('mouseleave', () => {
            compareTimeout = setTimeout(() => {
                compareBtnLabel.classList.remove('active');
            }, 600);
        });
    }
    const likeBtn = document.querySelector('.item-view__like');

    likeBtn.addEventListener('click', function () {
        likeBtn.classList.toggle('item-view__like--active');
    });

    const filterBtn = document.querySelector('.item-view__filter-btn.item-view-filter-btn');
    console.log(filterBtn);
    const filters = document.querySelector('.filters');

    const filterPlus = document.querySelectorAll('.filters__item-plus-btn');
    const filtersList = document.querySelectorAll('.filters__list');
    const filtersBox = document.querySelectorAll('.filters__item-box');

    filterPlus.forEach((el, i) => {
        el.addEventListener('click', () => {
            filtersList[i].classList.toggle('filters__list--active');
        });
    });
    filterBtn.addEventListener('click', function () {
        console.log('click filter');
        filterBtn.classList.toggle('filter-btn--active');
        filters.classList.toggle('filters--active');
        document.body.classList.toggle('disable-scroll');
    });

    let moreBtn = document.querySelector('.item-view__thumbs-btn');
    let itemSlideImg = document.querySelectorAll('.item-view__slide-img');

    let itemListSwiper = document.querySelector('.swiper.item-view__slider');
    let itemListSwiperMobTop = document.querySelector('.item-view__slider-mobile-top');
    let itemListSwiperMobCross = document.querySelector('.item-view__slider-mobile-cross');

    let itemListSwiperCross = document.querySelector('.item-view__slider-cross');
    let itemListSwiperThumbs = document.querySelector('.swiper.item-view__thumbs-swiper');
    let itemViewColorBtns = document.querySelectorAll('.item-view__content-color-card');
    let itemViewColorMobBtns = document.querySelectorAll('.item-view__content-color-mob-card');

    let itemViewConfigurationBtns = document.querySelectorAll('.item-view__content-configuration-item');
    let itemViewFilterItems = document.querySelectorAll('.filter-item');
    let ifFencyClosedSlides = document.querySelectorAll('.fencyClosed');
    // mobile Fency box
    itemListSwiper.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            itemListSwiper.classList.add('mob-active');
            itemListSwiperMobTop.classList.add('active');
            ifFencyClosedSlides.forEach((el) => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
                el.style.display = 'flex';
            });
        }
        if (window.innerWidth > 768) {
            itemListSwiper.classList.add('swiper-fency--active');
            itemListSwiperThumbs.classList.add('active');
            moreBtn.style.display = 'none';
            ifFencyClosedSlides.forEach((el) => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
                el.style.display = 'flex';
            });
        }
    });
    itemListSwiperMobCross.addEventListener('click', (e) => {
        e.stopPropagation();
        itemListSwiper.classList.remove('mob-active');
        itemListSwiperMobTop.classList.remove('active');
        ifFencyClosedSlides.forEach((el) => {
            el.style.opacity = '0';
            el.style.visibility = 'hidden';
            el.style.display = 'none';
        });
    });

    moreBtn.addEventListener('click', () => {
        itemListSwiper.classList.add('swiper-fency--active');
        itemListSwiperThumbs.classList.add('active');
        moreBtn.style.display = 'none';
        ifFencyClosedSlides.forEach((el) => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.display = 'flex';
        });
    });
    itemListSwiperCross.addEventListener('click', (e) => {
        e.stopPropagation();
        itemListSwiper.classList.remove('swiper-fency--active');
        itemListSwiperThumbs.classList.remove('active');
        moreBtn.style.display = 'block';
        ifFencyClosedSlides.forEach((el) => {
            el.style.opacity = '0';
            el.style.visibility = 'hidden';
            el.style.display = 'none';
        });
    });

    if (window.innerWidth > 768) {
        itemListSwiper.addEventListener('click', () => {});
    }

    itemViewColorBtns.forEach((el) => {
        el.addEventListener('click', () => {
            itemViewColorBtns.forEach((el) => el.classList.remove('item-view__content-color-card--active'));
            el.classList.add('item-view__content-color-card--active');
        });
    });
    itemViewColorMobBtns.forEach((el) => {
        el.addEventListener('click', () => {
            itemViewColorMobBtns.forEach((el) => el.classList.remove('item-view__content-color-mob--active'));
            el.classList.add('item-view__content-color-mob--active');
        });
    });
    itemViewConfigurationBtns.forEach((el) => {
        el.addEventListener('click', () => {
            itemViewConfigurationBtns.forEach((el) =>
                el.classList.remove('item-view__content-configuration-item--active')
            );
            el.classList.add('item-view__content-configuration-item--active');
        });
    });
    itemViewFilterItems.forEach((el) => {
        el.addEventListener('click', () => {
            itemViewFilterItems.forEach((el) => el.classList.remove('filter-active'));
            el.classList.add('filter-active');
        });
    });

    new Swiper('.item-view__other-brands', {
        modules: [Navigation, Scrollbar],
        navigation: {
            nextEl: '.item-view__other-brands-btn',
            prevEl: '.popular-models__btn-prev',
        },
        spaceBetween: 13,
        scrollbar: {
            el: '.item-view__other-brands-scrollbar',
        },
        breakpoints: {
            1250: {
                slidesPerView: 4.9,
                spaceBetween: 20,
            },
            1140: {
                slidesPerView: 4,
                spaceBetween: 13,
            },
            991: {
                slidesPerView: 3,
            },

            768: {
                slidesPerView: 4,
            },
            660: {
                slidesPerView: 3.5,
                spaceBetween: 10,
            },
            560: {
                slidesPerView: 2.7,
            },

            450: {
                slidesPerView: 3,
                spaceBetween: 5,
            },
            // // when window width is >= 320px
            320: {
                slidesPerView: 2.5,
                spaceBetween: 5,
            },
        },
    });

    let filtersBrandsItemPage = document.querySelectorAll('.filters__list-brands-list');
    let filterBrandsbtn = document.querySelector('.filters__item-btn-brands');

    let filtersModelsList = document.querySelector('.filters__list-models'),
        filtersModelsListItem = filtersModelsList.querySelectorAll('.filters__list-item');
    let filterModelsbtn = document.querySelector('.filters__item-btn-models');

    filterBrandsbtn.addEventListener('click', () => {
        for (let i = 2; i <= filtersBrandsItemPage.length; i++) {
            filtersBrandsItemPage[i].classList.toggle('hidden');
        }
    });
    filterModelsbtn.addEventListener('click', () => {
        for (let i = 5; i <= filtersModelsListItem.length; i++) {
            filtersModelsListItem[i].classList.toggle('hidden');
        }
    });

    let reviewItems = document.querySelectorAll('.reviews__item');
    let likes = document.querySelectorAll('.reviews__item-like');
    let dislikes = document.querySelectorAll('.reviews__item-dislike');

    likes.forEach((el, i) => {
        el.addEventListener('click', () => {
            if (!el.classList.contains('reviews__item-like--active')) {
                el.classList.add('reviews__item-like--active');
                el.querySelector('span').innerHTML = +el.querySelector('span').innerHTML + 1;
            } else {
                el.classList.remove('reviews__item-like--active');
                el.querySelector('span').innerHTML = +el.querySelector('span').innerHTML - 1;
            }
            if (dislikes[i].classList.contains('reviews__item-dislike--active')) {
                dislikes[i].classList.remove('reviews__item-dislike--active');
                dislikes[i].querySelector('span').innerHTML = +dislikes[i].querySelector('span').innerHTML - 1;
            }
        });
    });

    dislikes.forEach((el, i) => {
        el.addEventListener('click', () => {
            if (!el.classList.contains('reviews__item-dislike--active')) {
                el.classList.add('reviews__item-dislike--active');
                el.querySelector('span').innerHTML = +el.querySelector('span').innerHTML + 1;
            } else {
                el.classList.remove('reviews__item-dislike--active');
                el.querySelector('span').innerHTML = +el.querySelector('span').innerHTML - 1;
            }
            if (likes[i].classList.contains('reviews__item-like--active')) {
                likes[i].classList.remove('reviews__item-like--active');
                likes[i].querySelector('span').innerHTML = +likes[i].querySelector('span').innerHTML - 1;
            }
        });
        return false;
    });

    // Color picker
    let itemPageThumbsSlides = document.querySelectorAll('.item-view__thumbs-slide');
    let itemPageMainSlides = document.querySelectorAll('.item-view__slide');
    let colorPickerBtns = document.querySelectorAll('.item-view__content-color-card');

    colorPickerBtns.forEach((el, colorIndex) => {
        el.addEventListener('click', () => {
            itemPageThumbsSlides.forEach((el) => {
                let imgs = el.querySelectorAll('.item-view__thumbs-img');

                imgs.forEach((elem) => elem.classList.remove('item-view__thumbs-img--active'));
                imgs[colorIndex].classList.add('item-view__thumbs-img--active');
            });
            itemPageMainSlides.forEach((elSlide) => {
                let imgsSlides = elSlide.querySelectorAll('.item-view__slide-img');
                imgsSlides.forEach((elem) => elem.classList.remove('item-view__slide-img--active'));
                imgsSlides[colorIndex].classList.add('item-view__slide-img--active');
            });
        });
    });
    itemViewColorMobBtns.forEach((el, colorIndex) => {
        el.addEventListener('click', () => {
            itemPageThumbsSlides.forEach((el) => {
                let imgs = el.querySelectorAll('.item-view__thumbs-img');

                imgs.forEach((elem) => elem.classList.remove('item-view__thumbs-img--active'));
                imgs[colorIndex].classList.add('item-view__thumbs-img--active');
            });
            itemPageMainSlides.forEach((elSlide) => {
                let imgsSlides = elSlide.querySelectorAll('.item-view__slide-img');
                imgsSlides.forEach((elem) => elem.classList.remove('item-view__slide-img--active'));
                imgsSlides[colorIndex].classList.add('item-view__slide-img--active');
            });
        });
    });

    let moreCharacteristicBtn = document.querySelector('.characteristic__btn-more-bottom');
    let moreCharacteristicItems = document.querySelectorAll('.characteristic__item-more');
    moreCharacteristicBtn.addEventListener('click', () => {
        moreCharacteristicItems.forEach((el) => el.classList.toggle('active'));
    });
}
if (itemPage) {
    itemViewPageFunction();
}
// }

let showAllBtns = document.querySelectorAll('.show-all');
let otherToShow = document.querySelectorAll('.other-to-show');

showAllBtns.forEach((el, i) => {
    el.addEventListener('click', () => {
        otherToShow[i].classList.toggle('other-to-show--active');
    });
});

let compareModalInput = document.querySelector('.compare-add-modal__search-input');
let compareModalInputDropdown = document.querySelector('.compare-add-modal__search-dropdown');

if (compareModalInput) {
    compareModalInput.addEventListener('input', () => {
        if (compareModalInput.value.length == 0) {
            compareModalInputDropdown.classList.remove('compare-add-modal__search-dropdown-active');
        } else compareModalInputDropdown.classList.add('compare-add-modal__search-dropdown-active');
    });
}

//Sidebar-filters

let readMoreBox = document.querySelectorAll('.read-more-box');
let moreBtn = document.querySelectorAll('.read-more-btn');

moreBtn.forEach((el) => {
    el.addEventListener('click', () => {
        let moreBox = el.closest('.read-more-box').querySelector('.more');
        moreBox.classList.toggle('active');
    });
});

// readMoreBox.forEach((el) => {
//     el.addEventListener('click', (e) => {
//         let moreBox = el.querySelector('.more');

//         moreBtn.addEventListener('click', (e) => {
//             e.stopPropagation();
//             moreBox.classList.toggle('active');
//         });
//     });
// });

const filterBtns = document.querySelectorAll('.filter-btn');
const sidebar = document.querySelectorAll('.sidebar');
const label = document.querySelectorAll('.sidebar__delivery-label');
const check = document.querySelectorAll('.check_one');
const sidebarColor = document.querySelectorAll('.sidebar__case-color-item');

filterBtns.forEach((el, i) => {
    el.addEventListener('click', function () {
        el.classList.toggle('.filter-btn--active');
        console.log(sidebar[i]);
        if (sidebar[i]) {
            sidebar[i].classList.toggle('sidebar--active');
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        document.body.classList.add('disable-scroll');
    });
});

document.querySelectorAll('.sidebar__filter-btn').forEach((el, i) => {
    el.addEventListener('click', function () {
        sidebar[i].classList.remove('sidebar--active');
        document.body.classList.remove('disable-scroll');
    });
});

label.forEach((el, i) => {
    el.addEventListener('click', function () {
        setActiveLabel(i);
    });
});

function setActiveLabel(i) {
    if (check[i].checked) {
        label[i].classList.add('sidebar__delivery-label--active');
    }
    if (!check[i].checked) {
        label[i].classList.remove('sidebar__delivery-label--active');
    }
}

sidebarColor.forEach((el) => {
    el.addEventListener('click', () => {
        el.classList.toggle('sidebar__case-color-item--active');
    });
});

const sidebarItem = document.querySelectorAll('.sidebar__item');

sidebarItem.forEach((e) => {
    let sidebarItemTitle = e.querySelector('.sidebar-title');
    sidebarItemTitle.addEventListener('click', function () {
        e.classList.toggle('sidebar__item--active');
        // e.querySelector('.sidebar-box').classList.toggle('sidebar-box--active')
    });
});

//question
const questionOn = document.querySelectorAll('.question');
document.body.addEventListener('click', () => {
    questionOn.forEach((elem) => elem.classList.remove('question--active'));
});

questionOn.forEach((e) => {
    // let questionClose = e.querySelector('.question__tip-img');
    e.addEventListener('mouseover', function () {
        // questionOn.forEach(elem => elem.classList.remove('question--active'))
        e.classList.add('question--active');
    });
    e.addEventListener('mouseleave', function () {
        // questionOn.forEach(elem => elem.classList.remove('question--active'))
        e.classList.remove('question--active');
    });
    // questionClose.addEventListener('click', (w) => {
    //     w.stopPropagation()
    //     e.classList.remove('question--active')
    // })
});

function scroll() {
    const scrollTo = (element) => {
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: element.offsetTop,
        });
        console;
    };

    document.getElementById('displayFrom').addEventListener('click', () => {
        scrollTo(document.getElementById('displayTo'));
    });

    document.getElementById('glassFrom').addEventListener('click', () => {
        scrollTo(document.getElementById('glassTo'));
    });

    document.getElementById('brightFrom').addEventListener('click', () => {
        scrollTo(document.getElementById('brightTo'));
    });

    document.getElementById('compareFrom').addEventListener('click', () => {
        scrollTo(document.getElementById('compareTo'));
    });
}
if (document.querySelector('.gadgets__inner')) {
    scroll();
}
new Swiper('.catalog-item__slider', {
    modules: [Navigation, Pagination, EffectFade],
    loop: true,
    effect: 'fade',
    slidesPerView: 1,
    pagination: {
        el: '.catalog-item__pagination',
        clickable: true,
        type: 'bullets',
    },
});

new Swiper('.intro-swiper__swiper', {
    modules: [Navigation, Pagination, Autoplay],
    speed: 600,
    spaceBetween: 80,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.intro-swiper__btn-next',
        prevEl: '.intro-swiper__btn-prev',
    },
    pagination: {
        el: '.intro-swiper__pagination',
        clickable: true,
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
        draggable: true,
        dragSize: 100,
    },
});

new Swiper('.main-popular-models__swiper', {
    modules: [Navigation, Pagination, Scrollbar],
    spaceBetween: 13,
    slidesPerView: 4.7,
    navigation: {
        nextEl: '.popular-models__btn-next',
        prevEl: '.popular-models__btn-prev',
    },

    scrollbar: {
        el: '.popular-models__scrollbar',
        draggable: true,
        dragSize: 400,
    },
    breakpoints: {
        1280: {
            slidesPerView: 5,
            spaceBetween: 17,
        },
        1024: {
            slidesPerView: 4.1,
        },
        768: {
            slidesPerView: 4.3,
        },
        425: {
            slidesPerView: 2.5,
        },
        390: {
            slidesPerView: 2.3,
        },
        360: {
            slidesPerView: 2.2,
        },
        0: {
            spaceBetween: 5,
            slidesPerView: 2,
        },
    },
});

new Swiper('.banners-swiper', {
    modules: [Navigation, Scrollbar],
    // loop: true,
    spaceBetween: 17,
    slidesPerView: 3,
    scrollbar: {
        el: '.banners-swiper__scrollbar',
        draggable: true,
        dragSize: 300,
    },
    breakpoints: {
        1024: {
            slidesPerView: 3,
            allowTouchMove: false,
        },
        800: {
            slidesPerView: 2.2,
        },
        0: {
            slidesPerView: 1.5,
        },
    },
});

new Swiper('.last-added-swiper', {
    modules: [Navigation, Scrollbar],
    // loop: true,
    spaceBetween: 5,
    slidesPerView: 9,
    navigation: {
        nextEl: '.last-added-swiper__btn-next',
        prevEl: '.last-added-swiper__btn-prev',
    },

    scrollbar: {
        el: '.last-added-swiper__scrollbar',
        draggable: true,
        dragSize: 200,
    },
    breakpoints: {
        1280: {
            slidesPerView: 9,
        },
        1024: {
            slidesPerView: 7,
            allowTouchMove: false,
        },
        768: {
            slidesPerGroup: 3,
            slidesPerView: 5.5,
        },
        360: {
            slidesPerGroup: 3,
            slidesPerView: 3.4,
        },
        0: {
            slidesPerGroup: 3,
            slidesPerView: 2.4,
        },
    },
});

new Swiper('.popular-models__swiper', {
    modules: [Navigation, Scrollbar],
    navigation: {
        nextEl: '.popular-models__btn-next',
        prevEl: '.popular-models__btn-prev',
    },

    scrollbar: {
        el: '.popular-models__scrollbar',
    },
    breakpoints: {
        1250: {
            slidesPerView: 5,
            spaceBetween: 20,
        },
        1140: {
            slidesPerView: 4,
            spaceBetween: 13,
        },
        991: {
            slidesPerView: 3,
        },

        768: {
            slidesPerView: 4,
        },
        660: {
            slidesPerView: 3.5,
            spaceBetween: 10,
        },
        560: {
            slidesPerView: 2.7,
        },

        450: {
            slidesPerView: 3,
            spaceBetween: 5,
        },
        // // when window width is >= 320px
        320: {
            slidesPerView: 2.5,
            spaceBetween: 5,
        },
    },
});

new Swiper('.compare-interesting__swiper', {
    modules: [Navigation, Scrollbar],
    navigation: {
        nextEl: '.interesting__swiper-next',
        prevEl: '.interesting__swiper-prev',
    },

    scrollbar: {
        el: '.interesting__swiper-scrollbar',
    },

    // slidesPerView: 4,
    breakpoints: {
        1200: {
            slidesPerView: 4.5,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 3.1,
            spaceBetween: 10,
        },
        780: {
            slidesPerView: 3.1,
            spaceBetween: 13,
        },
        768: {
            slidesPerView: 2.3,
            spaceBetween: 13,
        },
        500: {
            slidesPerView: 1.6,
            spaceBetween: 7,
        },
        450: {
            slidesPerView: 1.4,
            spaceBetween: 7,
        },
        425: {
            slidesPerView: 1.3,
            spaceBetween: 7,
        },
        400: {
            slidesPerView: 1.5,
            spaceBetween: 7,
        },
        375: {
            slidesPerView: 1.2,
            spaceBetween: 7,
        },
        340: {
            slidesPerView: 1.5,
        },
        320: {
            slidesPerView: 1,
        },
    },
});

new Swiper('.interesting__swiper', {
    modules: [Navigation, Scrollbar],
    navigation: {
        nextEl: '.interesting__swiper-next',
        prevEl: '.interesting__swiper-prev',
    },

    scrollbar: {
        el: '.interesting__swiper-scrollbar',
    },
    spaceBetween: 13,

    breakpoints: {
        1200: {
            slidesPerView: 3.5,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 3.1,
            spaceBetween: 10,
        },
        780: {
            slidesPerView: 3.1,
            spaceBetween: 13,
        },

        600: {
            slidesPerView: 2,
            spaceBetween: 7,
        },

        450: {
            slidesPerView: 1.7,
            spaceBetween: 7,
        },

        400: {
            slidesPerView: 1.4,
            spaceBetween: 7,
        },
        320: {
            slidesPerView: 1.1,
        },
    },
});

//catalogView

/*  МОДАЛКи */
const modal = document.querySelectorAll('modal');
if (modal) {
    MicroModal.init({
        // onShow: modal => console.info(`${modal.id} is shown`), // [1]
        // onClose: modal => console.info(`${modal.id} is hidden`), // [2]
        openTrigger: 'data-micromodal-trigger', // [3]
        closeTrigger: 'data-custom-close', // [4]
        disableScroll: true, // [5]
        disableFocus: false, // [6]
        awaitOpenAnimation: false, // [7]
        awaitCloseAnimation: false, // [8]
        debugMode: true, // [9]
    });
}
//DropDown/select(выпадающий список)
document.querySelectorAll('.dropdown-box').forEach(function (downWrapper) {
    const downBtn = downWrapper.querySelector('.dropdown-select');
    const downList = downWrapper.querySelector('.dropdown-list');
    const downItems = downList.querySelectorAll('.dropdown-item');

    //Клик по кнопке, открыть/закрыть select
    downBtn.addEventListener('click', function (e) {
        e.preventDefault();
        downList.classList.toggle('dropdown-list--active');
        downBtn.classList.toggle('dropdown-select--active');
    });

    //Выбор элемента списка, запомнить выбранное значение,закрыть дропдаун
    downItems.forEach(function (listItem) {
        listItem.addEventListener('click', function (e) {
            e.stopPropagation();
            downBtn.innerText = this.innerText;
            downList.classList.remove('dropdown-list--active');
            downBtn.classList.remove('dropdown-select--active');
        });
    });

    //Клик снаружи дропдауна, закрыть дропдаун
    document.addEventListener('click', function (e) {
        console.log('Document Click');
        if (e.target !== downBtn) {
            downList.classList.remove('dropdown-list--active');
            downBtn.classList.remove('dropdown-select--active');
        }
    });
});

//ACCORDION
const accordions = document.querySelector('.accordion-container');
const accordionsCompare = document.querySelector('.accordion-container-page');
const accordionsCompareMain = document.querySelector('.accordion-container-page-mainmm');
const accordionsCompareTabs = document.querySelector('.accordion-container-compare-page-tabs');
const accordionsHistory = document.querySelector('.accordion-container-history');
const accordionsCompareTabsMain = document.querySelector('.accordion-container-compare-page-tabs-main');
if (accordionsHistory) {
    new Accordion(accordionsHistory, {
        // animation duration in ms {number}
        duration: 600,
        // add ARIA elements to the HTML structure {boolean}
        ariaEnabled: true,
        // allow collapse expanded panel {boolean}
        collapse: true,
        // show multiple elements at the same time {boolean}
        showMultiple: true,
        // show accordion elements during initialization {array}
        openOnInit: [],
        // element class {string}
        elementClass: 'ac',
        // trigger class {string}
        triggerClass: 'ac-trigger',
        // panel class {string}
        panelClass: 'ac-panel',
        // active element class {string}
        activeClass: 'is-active',
    });
}
if (accordions) {
    let acc = new Accordion(accordions, {
        // animation duration in ms {number}
        duration: 600,
        // add ARIA elements to the HTML structure {boolean}
        ariaEnabled: true,
        // allow collapse expanded panel {boolean}
        collapse: true,
        // show multiple elements at the same time {boolean}
        showMultiple: true,
        // show accordion elements during initialization {array}
        openOnInit: [],
        // element class {string}
        elementClass: 'ac',
        // trigger class {string}
        triggerClass: 'ac-trigger',
        // panel class {string}
        panelClass: 'ac-panel',
        // active element class {string}
        activeClass: 'is-active',
    });

    function setAcc() {
        if (window.innerWidth <= 768) {
            acc.closeAll();
        } else {
            setInterval(() => {
                acc.openAll();
            }, 0);
        }
    }
    setAcc();
    window.addEventListener('resize', () => {
        setAcc();
    });
}
if (accordionsCompare) {
    new Accordion(accordionsCompare, {
        // animation duration in ms {number}
        duration: 600,
        // add ARIA elements to the HTML structure {boolean}
        ariaEnabled: true,
        // allow collapse expanded panel {boolean}
        collapse: true,
        // show multiple elements at the same time {boolean}
        showMultiple: true,
        // show accordion elements during initialization {array}
        openOnInit: [],
        // element class {string}
        elementClass: 'ac',
        // trigger class {string}
        triggerClass: 'ac-trigger',
        // panel class {string}
        panelClass: 'ac-panel',
        // active element class {string}
        activeClass: 'is-active',
    });
}
if (accordionsCompareTabs) {
    new Accordion(accordionsCompareTabs, {
        // animation duration in ms {number}
        duration: 600,
        // add ARIA elements to the HTML structure {boolean}
        ariaEnabled: true,
        // allow collapse expanded panel {boolean}
        collapse: true,
        // show multiple elements at the same time {boolean}
        showMultiple: true,
        // show accordion elements during initialization {array}
        openOnInit: [],
        // element class {string}
        elementClass: 'ac',
        // trigger class {string}
        triggerClass: 'ac-trigger',
        // panel class {string}
        panelClass: 'ac-panel',
        // active element class {string}
        activeClass: 'is-active',
    });
}
if (document.querySelector('.compare')) {
    new Accordion(accordionsCompareTabsMain, {
        // animation duration in ms {number}
        duration: 600,
        // add ARIA elements to the HTML structure {boolean}
        ariaEnabled: true,
        // allow collapse expanded panel {boolean}
        collapse: true,
        // show multiple elements at the same time {boolean}
        showMultiple: true,
        // show accordion elements during initialization {array}
        openOnInit: [],
        // element class {string}
        elementClass: 'ac',
        // trigger class {string}
        triggerClass: 'ac-trigger',
        // panel class {string}
        panelClass: 'ac-panel',
        // active element class {string}
        activeClass: 'is-active',
    });
    new Accordion(accordionsCompareMain, {
        // animation duration in ms {number}
        duration: 600,
        // add ARIA elements to the HTML structure {boolean}
        ariaEnabled: true,
        // allow collapse expanded panel {boolean}
        collapse: true,
        // show multiple elements at the same time {boolean}
        showMultiple: true,
        // show accordion elements during initialization {array}
        openOnInit: [],
        // element class {string}
        elementClass: 'ac',
        // trigger class {string}
        triggerClass: 'ac-trigger',
        // panel class {string}
        panelClass: 'ac-panel',
        // active element class {string}
        activeClass: 'is-active',
    });
}

//Табы(переключение)
const tabs = document.querySelectorAll('.compare__tabs-switch');
const switches = document.querySelectorAll('.compare-switches__switch-btn');
const switchesModal = document.querySelectorAll('.compare-modal-switch');

tabs.forEach(function (item) {
    item.addEventListener('click', () => {
        tabs.forEach((el) => el.classList.remove('compare__tabs-switch--active'));
        item.classList.add('compare__tabs-switch--active');
    });
});
switches.forEach(function (item) {
    item.addEventListener('click', () => {
        switches.forEach((el) => el.classList.remove('compare-switches__switch-btn--active'));
        item.classList.add('compare-switches__switch-btn--active');
    });
});
switchesModal.forEach(function (item) {
    item.addEventListener('click', () => {
        switchesModal.forEach((el) => el.classList.remove('compare-modal-switch--active'));
        item.classList.add('compare-modal-switch--active');
    });
});

let rowTabs = document.querySelectorAll('.row-tab');

rowTabs.forEach((el) => {
    let rowTabBtn = el.querySelector('.row');
    rowTabBtn.addEventListener('click', () => {
        el.classList.toggle('active');
    });
});

let sidebarCheckboxes = document.querySelectorAll('.checkbox-trigger');
let sidebarLabels = document.querySelectorAll('.sidebar-label-search');
sidebarCheckboxes.forEach((el) => {
    let label = el.querySelector('.sidebar-label-search');
    el.addEventListener('click', () => {
        sidebarLabels.forEach((el) => el.classList.remove('active'));
        label.classList.add('active');
    });
});
document.body.addEventListener('click', (e) => {
    if (!e.target.closest('.checkbox-trigger')) {
        sidebarLabels.forEach((el) => el.classList.remove('active'));
    }
});
let checkboxInputTrigger = document.querySelectorAll('.checkbox-trigger-input');

// inputTriggerInputs.forEach(el => {
//     el.addEventListener('input', () => {
//         console.log('sds');
//         inputTriggerLabel.classList.add('active')
//     })
// })
checkboxInputTrigger.forEach((el) => {
    let label = el.querySelector('.sidebar-label-search');
    el.querySelectorAll('input').forEach((elem) => {
        elem.addEventListener('input', () => {
            label.classList.add('active');
        });
    });
});

$(function () {


    // (スマホ用)MENUバーをクリックでヘッダーメニューリストをスライドオープン
    $('#navToggle').click(function () {
        $('#js-nav').toggleClass('is-open');
    });




    // countUp()が開始される前における、要素の取得位置の初期値
    var currentPage = -1;
    var lastPage = parseInt($('#slides li').length - 1);
    var nextPage = 0;

    // 全画面スライドショー(フェード)の重なりの順序を指定
    $('#slides li').css('z-index', '-3');
    $('#slides li').eq(nextPage).css('z-index', '-1');

    // 一番上の要素を一番下に移動させて、要素の重なりの順序を入れ替える(1秒かけて一番上の要素をフェードアウト)
    function changePage() {
        $('#slides li').css('z-index', '-3');
        $('#slides li').eq(currentPage).css('z-index', '-1');
        $('#slides li').eq(nextPage).css('z-index', '-2');
        $('#slides li').css('display', 'block');
        $('#slides li').eq(currentPage).fadeOut(1000);
    }
    // 取得している要素、若しくは次に取得する要素が列の最後の要素かによって取得位置の定義を変化させ、changePage()する。(0が列の一番手前の取得要素)
    function countUp() {
        if (currentPage == lastPage) {
            currentPage = 0;
            nextPage = 1;
            changePage();
        } else if (nextPage == lastPage) {
            currentPage++;
            nextPage = 0;
            changePage();
        } else {
            nextPage = nextPage + 1;
            currentPage++;
            changePage();
        }
    }
    // 4.5秒おきにcountUp()を発火する
    var Timer;
    function startTimer() {
        Timer = setInterval(function () {
            countUp();
        }, 4500);
    }
    startTimer();




    // ページトップから200px差の位置でスクロールボタン表示・非表示
    var topBtn = $('#scrollTop');
    topBtn.hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
    });
    // スクロールボタンをクリックすると滑らかにページトップへ移動
    topBtn.click(function (event) {
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    });
})

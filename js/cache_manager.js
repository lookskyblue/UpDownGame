function saveScore(now_score) {

    let my_best_score = localStorage.getItem('BEST_SCORE');

    if(now_score > my_best_score)
    localStorage.setItem('BEST_SCORE',now_score.toString());
}

function loadScore() {
    let my_order = localStorage.getItem('BEST_SCORE');

    if(my_order == null)
        return 0;
        
    return my_order;
}
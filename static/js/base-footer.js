export function getBaseFooterHtml() {
    return `
    <div class="remodal remodal-loader" data-remodal-options="hashTracking: false, closeOnOutsideClick: false"
        data-remodal-options="" role="dialog" data-remodal-id="loader">
        <div class="remodal-loader__logo">
            <img src="{{store.logo}}" alt="{{store.name}}">
        </div>
        <div class="remodal-loader__loading">
            <svg preserveAspectRatio="xMidYMid" viewBox="0 0 100 30"
                xmlns="http://www.w3.org/2000/svg" height="25px" width="100px" class="lds-message">
                <g transform="translate(20 15)">
                    <circle cx="0" cy="0" r="6" fill="#FF5F74" transform="scale(0.297012 0.297012)">
                        <animateTransform attributeName="transform" type="scale" begin="-0.3375s" calcMode="spline"
                                        keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="0.9s"
                                        repeatCount="indefinite"></animateTransform>
                    </circle>
                </g>
                <g transform="translate(40 15)">
                    <circle cx="0" cy="0" r="6" fill="#FF5F74" transform="scale(0.654739 0.654739)">
                        <animateTransform attributeName="transform" type="scale" begin="-0.225s" calcMode="spline"
                                        keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="0.9s"
                                        repeatCount="indefinite"></animateTransform>
                    </circle>
                </g>
                <g transform="translate(60 15)">
                    <circle cx="0" cy="0" r="6" fill="#FF5F74" transform="scale(0.935881 0.935881)">
                        <animateTransform attributeName="transform" type="scale" begin="-0.1125s" calcMode="spline"
                                        keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="0.9s"
                                        repeatCount="indefinite"></animateTransform>
                    </circle>
                </g>
                <g transform="translate(80 15)">
                    <circle cx="0" cy="0" r="6" fill="#FF5F74" transform="scale(0.964916 0.964916)">
                        <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline"
                                        keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="0.9s"
                                        repeatCount="indefinite"></animateTransform>
                    </circle>
                </g>
            </svg>
        </div>
    </div>
    <div class="remodal remodal-information" data-remodal-options="hashTracking: false"
        data-remodal-options="" role="dialog" data-remodal-id="remodal-information">
        <div class="remodal-information__main">
            <div class="remodal-information__content">
                <div class="remodal-information__text js-remodal-information__text"></div>
            </div>
            <div class="remodal-information__actions">
                <button class="remodal-information__button js-remodal-information__button"></button>
            </div>
        </div>
    </div>
    `
}
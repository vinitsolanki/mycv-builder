import { ConfigActions } from './config.actions';
const themes = [
  "bg-primary",
"bg-secondary",
"bg-success",
"bg-info",
"bg-warning",
"bg-danger",
"bg-light",
"bg-dark",
"bg-focus",
"bg-alternate",
"bg-vicious-stance",
"bg-midnight-bloom",
"bg-night-sky",
"bg-slick-carbon",
"bg-asteroid",
"bg-royal",
"bg-warm-flame",
"bg-night-fade",
"bg-sunny-morning",
"bg-tempting-azure",
"bg-amy-crisp",
"bg-heavy-rain",
"bg-mean-fruit",
"bg-malibu-beach",
"bg-deep-blue",
"bg-ripe-malin",
"bg-arielle-smile",
"bg-plum-plate",
"bg-happy-fisher",
"bg-happy-itmeo",
"bg-mixed-hopes",
"bg-strong-bliss",
"bg-grow-early",
"bg-love-kiss",
"bg-premium-dark",
"bg-happy-green"
];



const INITIAL_STATE = {
  headerTheme:  themes[15],
  sidebarTheme:  themes.length-1,
}

export function ConfigReducer(state = INITIAL_STATE, action: any): any {

  switch (action.type) {
    case ConfigActions.CONFIG_GET:
      return Object.assign({}, state);

    case ConfigActions.CONFIG_UPDATE:
      return Object.assign({}, state, {...action.payload});

    default:
      return state;
  }
}


export const HasAnalytics = (superclass) =>
  class extends superclass {
    logInteraction(action, detail) {
      let options = {
        detail: {
          action,
          ...detail,
        },
        bubbles: true,
        composed: true,
      };

      this.dispatchEvent(new CustomEvent("analytics-event", options));
    }
  };

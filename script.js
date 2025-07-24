// Theme Management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("themeToggle");
    this.themeIcon = document.getElementById("themeIcon");
    this.currentTheme = this.getInitialTheme();

    this.init();
  }

  getInitialTheme() {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }

    // Detect system theme preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }

    return "light";
  }

  init() {
    this.setTheme(this.currentTheme);
    this.themeToggle.addEventListener("click", () => this.toggleTheme());
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    this.themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    localStorage.setItem("theme", theme);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light";
    this.setTheme(newTheme);
  }
}

class CurrencyConverter {
  constructor() {
    this.exchangeRates = new Map();
    this.currencies = new Set();
    this.apiData = null;

    this.initializeElements();
    this.parseUrlParameters();
    this.fetchExchangeRates();
    this.bindEvents();
  }

  initializeElements() {
    this.fromAmountInput = document.getElementById("fromAmount");
    this.toAmountInput = document.getElementById("toAmount");
    this.fromCurrencySelect = document.getElementById("fromCurrency");
    this.toCurrencySelect = document.getElementById("toCurrency");
    this.swapButton = document.getElementById("swapButton");
    this.rateDisplay = document.getElementById("rateDisplay");
    this.loadingDiv = document.getElementById("loading");
    this.errorDiv = document.getElementById("error");
  }

  parseUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get("from");
    const to = urlParams.get("to");
    const amount = urlParams.get("amount");

    if (from && to) {
      this.defaultFromCurrency = from.toUpperCase();
      this.defaultToCurrency = to.toUpperCase();
      this.defaultAmount = amount || "1";
    }
  }

  async fetchExchangeRates() {
    this.showLoading(true);
    this.hideError();

    try {
      const response = await fetch(
        "https://taptap-api.anwaarulislaam.workers.dev/"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.apiData = await response.json();
      this.processExchangeRates();
      this.populateCurrencySelects();
      this.setDefaultCurrencies();
      this.calculateConversion();

      // Ensure error is hidden on success
      this.hideError();
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      this.showError("Failed to fetch exchange rates. Please try again later.");
    } finally {
      this.showLoading(false);
    }
  }

  processExchangeRates() {
    this.exchangeRates.clear();
    this.currencies.clear();

    this.apiData.availableCountries.forEach((country) => {
      const fromCurrency = country.currency;
      this.currencies.add(fromCurrency);

      if (!this.exchangeRates.has(fromCurrency)) {
        this.exchangeRates.set(fromCurrency, new Map());
      }

      country.corridors.forEach((corridor) => {
        const toCurrency = corridor.currency;
        const rate = parseFloat(corridor.fxRate);

        this.currencies.add(toCurrency);
        this.exchangeRates.get(fromCurrency).set(toCurrency, rate);
      });
    });

    // Add reverse rates for better coverage
    this.addReverseRates();
  }

  addReverseRates() {
    const currencyArray = Array.from(this.currencies);

    currencyArray.forEach((fromCurrency) => {
      currencyArray.forEach((toCurrency) => {
        if (fromCurrency !== toCurrency) {
          // If direct rate doesn't exist, try to find reverse rate
          if (!this.exchangeRates.get(fromCurrency)?.has(toCurrency)) {
            const reverseRate = this.exchangeRates
              .get(toCurrency)
              ?.get(fromCurrency);
            if (reverseRate && reverseRate > 0) {
              if (!this.exchangeRates.has(fromCurrency)) {
                this.exchangeRates.set(fromCurrency, new Map());
              }
              this.exchangeRates
                .get(fromCurrency)
                .set(toCurrency, 1 / reverseRate);
            }
          }
        }
      });
    });
  }

  populateCurrencySelects() {
    const sortedCurrencies = Array.from(this.currencies).sort();

    // Clear existing options
    this.fromCurrencySelect.innerHTML = "";
    this.toCurrencySelect.innerHTML = "";

    sortedCurrencies.forEach((currency) => {
      const option1 = new Option(currency, currency);
      const option2 = new Option(currency, currency);

      this.fromCurrencySelect.appendChild(option1);
      this.toCurrencySelect.appendChild(option2);
    });

    // Add slide-up animation to the form
    document.querySelector(".converter-form").classList.add("slide-up");
  }

  setDefaultCurrencies() {
    // Set default currencies based on URL parameters or fallback to USD/BDT
    const fromCurrency = this.defaultFromCurrency || "USD";
    const toCurrency = this.defaultToCurrency || "BDT";
    const amount = this.defaultAmount || "1";

    if (this.currencies.has(fromCurrency)) {
      this.fromCurrencySelect.value = fromCurrency;
    }

    if (this.currencies.has(toCurrency)) {
      this.toCurrencySelect.value = toCurrency;
    }

    // Set the default amount
    this.fromAmountInput.value = amount;
  }

  bindEvents() {
    this.fromAmountInput.addEventListener("input", () => {
      this.calculateConversion();
      this.updateURL();
    });
    this.fromCurrencySelect.addEventListener("change", () => {
      this.calculateConversion();
      this.updateURL();
    });
    this.toCurrencySelect.addEventListener("change", () => {
      this.calculateConversion();
      this.updateURL();
    });
    this.swapButton.addEventListener("click", () => this.swapCurrencies());

    // Allow editing the "to" amount for reverse calculation
    this.toAmountInput.addEventListener("input", () => {
      this.reverseCalculateConversion();
      this.updateURL();
    });
  }

  calculateConversion() {
    const fromAmount = parseFloat(this.fromAmountInput.value) || 0;
    const fromCurrency = this.fromCurrencySelect.value;
    const toCurrency = this.toCurrencySelect.value;

    if (!fromCurrency || !toCurrency || fromAmount === 0) {
      this.toAmountInput.value = "";
      this.hideRateDisplay();
      this.hideError(); // Clear any previous errors
      return;
    }

    if (fromCurrency === toCurrency) {
      this.toAmountInput.value = fromAmount.toFixed(2);
      this.showRateDisplay(1, fromCurrency, toCurrency);
      this.hideError(); // Clear any previous errors
      return;
    }

    const rate = this.getExchangeRate(fromCurrency, toCurrency);

    if (rate) {
      const convertedAmount = fromAmount * rate;
      this.toAmountInput.value = convertedAmount.toFixed(2);
      this.showRateDisplay(rate, fromCurrency, toCurrency);
      this.hideError(); // Clear any previous errors
    } else {
      this.toAmountInput.value = "";
      this.showError(
        `Exchange rate not available for ${fromCurrency} to ${toCurrency}`
      );
    }
  }

  reverseCalculateConversion() {
    const toAmount = parseFloat(this.toAmountInput.value) || 0;
    const fromCurrency = this.fromCurrencySelect.value;
    const toCurrency = this.toCurrencySelect.value;

    if (!fromCurrency || !toCurrency || toAmount === 0) {
      this.fromAmountInput.value = "";
      this.hideRateDisplay();
      this.hideError();
      return;
    }

    if (fromCurrency === toCurrency) {
      this.fromAmountInput.value = toAmount.toFixed(2);
      this.showRateDisplay(1, fromCurrency, toCurrency);
      this.hideError();
      return;
    }

    const rate = this.getExchangeRate(fromCurrency, toCurrency);

    if (rate && rate > 0) {
      const originalAmount = toAmount / rate;
      this.fromAmountInput.value = originalAmount.toFixed(2);
      this.showRateDisplay(rate, fromCurrency, toCurrency);
      this.hideError();
    } else {
      this.fromAmountInput.value = "";
      this.showError(
        `Exchange rate not available for ${fromCurrency} to ${toCurrency}`
      );
    }
  }

  getExchangeRate(fromCurrency, toCurrency) {
    return this.exchangeRates.get(fromCurrency)?.get(toCurrency) || null;
  }

  swapCurrencies() {
    const fromCurrency = this.fromCurrencySelect.value;
    const toCurrency = this.toCurrencySelect.value;
    const fromAmount = this.fromAmountInput.value;
    const toAmount = this.toAmountInput.value;

    this.fromCurrencySelect.value = toCurrency;
    this.toCurrencySelect.value = fromCurrency;
    this.fromAmountInput.value = toAmount;

    this.calculateConversion();
    this.updateURL();
  }

  updateURL() {
    const fromCurrency = this.fromCurrencySelect.value;
    const toCurrency = this.toCurrencySelect.value;
    const amount = this.fromAmountInput.value;

    if (fromCurrency && toCurrency && amount) {
      const params = new URLSearchParams();
      params.set("from", fromCurrency.toLowerCase());
      params.set("to", toCurrency.toLowerCase());
      params.set("amount", amount);

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }
  }

  showRateDisplay(rate, fromCurrency, toCurrency) {
    this.rateDisplay.innerHTML = `
                    <div style="font-size: 1.1rem; margin-bottom: 8px;">
                        <strong>1 ${fromCurrency}</strong> = <strong>${rate.toFixed(
      4
    )} ${toCurrency}</strong>
                    </div>
                    <div style="font-size: 0.95rem; opacity: 0.8; color: var(--text-muted);">
                        1 ${toCurrency} = ${(1 / rate).toFixed(
      4
    )} ${fromCurrency}
                    </div>
                `;
    this.rateDisplay.classList.remove("hidden");
    this.rateDisplay.classList.add("fade-in");
  }

  hideRateDisplay() {
    this.rateDisplay.classList.add("hidden");
  }

  showLoading(show) {
    if (show) {
      this.loadingDiv.classList.remove("hidden");
    } else {
      this.loadingDiv.classList.add("hidden");
    }
  }

  showError(message) {
    this.errorDiv.textContent = message;
    this.errorDiv.classList.remove("hidden");
    setTimeout(() => this.hideError(), 5000);
  }

  hideError() {
    this.errorDiv.classList.add("hidden");
  }
}

// Initialize the currency converter and theme manager when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();
  new CurrencyConverter();
});

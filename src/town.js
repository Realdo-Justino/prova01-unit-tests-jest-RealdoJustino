class TownAdministration {
  constructor(name, mayor, population = 0) {
    this.name = name;
    this.mayor = mayor;
    this.population = population;
    this.residents = [];
    this.services = [];
    this.events = [];
    this.budgets = {};
    this.isOperational = true;
  }

  getName() {
    return this.name;
  }

  getMayor() {
    return this.mayor;
  }

  changeMayor(name) {
    if (!name || typeof name !== "string") {
      throw new Error("Invalid mayor name");
    }

    this.mayor = name;
    return this.mayor;
  }

  getPopulation() {
    return this.population;
  }

  updatePopulation(amount) {
    if (amount < 0) {
      throw new Error("Population cannot be negative");
    }

    this.population = amount;
    return this.population;
  }

  addResident(name) {
    if (!name || typeof name !== "string") {
      throw new Error("Invalid resident name");
    }

    this.residents.push(name);
    this.population++;
    return name;
  }

  removeResident(name) {
    const index = this.residents.indexOf(name);

    if (index === -1) {
      return false;
    }

    this.residents.splice(index, 1);
    this.population--;
    return true;
  }

  getResidents() {
    return [...this.residents];
  }

  addService(service) {
    if (!service || typeof service !== "string") {
      throw new Error("Invalid service");
    }

    this.services.push(service);
    return service;
  }

  removeService(service) {
    const index = this.services.indexOf(service);

    if (index === -1) {
      return false;
    }

    this.services.splice(index, 1);
    return true;
  }

  hasService(service) {
    return this.services.includes(service);
  }

  getServices() {
    return [...this.services];
  }

  scheduleEvent(name, date) {
    if (!name || !date) {
      throw new Error("Event name and date are required");
    }

    const event = { name, date };
    this.events.push(event);
    return event;
  }

  getEvents() {
    return [...this.events];
  }

  allocateBudget(category, amount) {
    if (!category || amount < 0) {
      throw new Error("Invalid budget");
    }

    this.budgets[category] = amount;
    return amount;
  }

  getBudget(category) {
    return this.budgets[category] || 0;
  }

  getTotalBudget() {
    return Object.values(this.budgets).reduce(
      (total, amount) => total + amount,
      0
    );
  }

  closeAdministration() {
    this.isOperational = false;
    return this.isOperational;
  }

  reopenAdministration() {
    this.isOperational = true;
    return this.isOperational;
  }

  isOpen() {
    return this.isOperational;
  }

  getSummary() {
    return {
      name: this.name,
      mayor: this.mayor,
      population: this.population,
      residents: this.residents.length,
      services: this.services.length,
      events: this.events.length,
      totalBudget: this.getTotalBudget(),
      isOperational: this.isOperational
    };
  }
}

module.exports = TownAdministration;
const TownAdministration = require('../src/town');

describe('Testes da classe "town" ou cidade', () => {
    let town;

    beforeEach(() => {
        town = new TownAdministration(
            'Criciuma',
            'Carlos Francisco',
            1000000
        );
    })
    
    test('Deve criar uma cidade com nome, prefeito e população', () => {
        expect(town.getName()).toBe('Criciuma');
        expect(town.getMayor()).toBe('Carlos Francisco');
        expect(town.getPopulation()).toBe(1000000);
    });

    test('Deve usar população 0 quando não informada', () => {
        const newTown = new TownAdministration('Criciuma', 'Carlos Francisco');

        expect(newTown.getPopulation()).toBe(0);
    });

    test('Deve alterar o prefeito', () => {
        town.changeMayor('Adao Jucrebre');

        expect(town.getMayor()).toBe('Adao Jucrebre');
    });

    test('Não deve alterar o prefeito quando inválido', () => {
        expect(() => town.changeMayor(undefined))
            .toThrow('Invalid mayor name');

        expect(() => town.changeMayor(''))
            .toThrow('Invalid mayor name');

        expect(() => town.changeMayor(123))
            .toThrow('Invalid mayor name');
    });

    test('Deve retornar o novo prefeito ao alterar', () => {
        const result = town.changeMayor('Adao Jucrebre');

        expect(result).toBe('Adao Jucrebre');
    });

    test('Deve alterar população', () => {
        town.updatePopulation(10);

        expect(town.getPopulation()).toBe(10);
    });

    test('Não deve alterar população quando menor que 0', () => {
        expect(() => town.updatePopulation(-1))
            .toThrow('Population cannot be negative');
    });

    test('Deve retornar a nova população ao atualizar', () => {
        const result = town.updatePopulation(500);

        expect(result).toBe(500);
    });

    test('Deve ser capaz de adicionar residente', () => {
        town.addResident('Jonh');

        expect(town.getResidents()[0]).toBe('Jonh');
        expect(town.getPopulation()).toBe(1000001);
    });

    test('Não deve ser capaz de adicionar residente com nome inválido', () => {
        expect(() => town.addResident(undefined))
            .toThrow('Invalid resident name');

        expect(() => town.addResident(''))
            .toThrow('Invalid resident name');

        expect(() => town.addResident(123))
            .toThrow('Invalid resident name');
    });

    test('Deve retornar o nome do residente adicionado', () => {
        const result = town.addResident('Jonh');

        expect(result).toBe('Jonh');
    });

    test('Deve ser capaz de remover residente', () => {
        town.addResident('Jonh');

        const result = town.removeResident('Jonh');

        expect(result).toBe(true);
        expect(town.getPopulation()).toBe(1000000);
        expect(town.getResidents()).not.toContain('Jonh');
    });

    test('Não deve ser capaz de remover residente inexistente', () => {
        const result = town.removeResident('Jonh');

        expect(result).toBe(false);
        expect(town.getPopulation()).toBe(1000000);
    });

    test('Deve retornar uma cópia dos residentes', () => {
        town.addResident('Jonh');

        const residents = town.getResidents();
        residents.push('Outro');

        expect(town.getResidents()).toEqual(['Jonh']);
    });

    test('Deve ser capaz de adicionar serviço', () => {
        town.addService('Limpar Estrada');

        expect(town.hasService('Limpar Estrada')).toBe(true);
        expect(town.getServices()[0]).toBe('Limpar Estrada');
    });

    test('Não deve ser capaz de adicionar serviço inválido', () => {
        expect(() => town.addService(undefined))
            .toThrow('Invalid service');

        expect(() => town.addService(''))
            .toThrow('Invalid service');

        expect(() => town.addService(123))
            .toThrow('Invalid service');
    });

    test('Deve retornar o serviço adicionado', () => {
        const result = town.addService('Hospital');

        expect(result).toBe('Hospital');
    });

    test('Deve ser capaz de remover serviço', () => {
        town.addService('Hospital');

        const result = town.removeService('Hospital');

        expect(result).toBe(true);
        expect(town.hasService('Hospital')).toBe(false);
    });

    test('Não deve remover serviço inexistente', () => {
        const result = town.removeService('Hospital');

        expect(result).toBe(false);
    });

    test('Deve verificar se a cidade possui determinado serviço', () => {
        town.addService('Hospital');

        expect(town.hasService('Hospital')).toBe(true);
        expect(town.hasService('Escola')).toBe(false);
    });

    test('Deve retornar uma cópia dos serviços', () => {
        town.addService('Hospital');

        const services = town.getServices();
        services.push('Escola');

        expect(town.getServices()).toEqual(['Hospital']);
    });

    test('Deve agendar um evento', () => {
        const event = town.scheduleEvent(
            'Festa da Cidade',
            '2026-09-07'
        );

        expect(event).toEqual({
            name: 'Festa da Cidade',
            date: '2026-09-07'
        });

        expect(town.getEvents()).toHaveLength(1);
    });

    test('Não deve agendar evento sem nome', () => {
        expect(() => town.scheduleEvent('', '2026-09-07'))
            .toThrow('Event name and date are required');
    });

    test('Não deve agendar evento sem data', () => {
        expect(() => town.scheduleEvent('Festa da Cidade', ''))
            .toThrow('Event name and date are required');
    });

    test('Deve retornar os eventos agendados', () => {
        town.scheduleEvent('Festa da Cidade', '2026-09-07');

        expect(town.getEvents()).toEqual([
            {
                name: 'Festa da Cidade',
                date: '2026-09-07'
            }
        ]);
    });

    test('Deve retornar uma cópia dos eventos', () => {
        town.scheduleEvent('Festa da Cidade', '2026-09-07');

        const events = town.getEvents();
        events.push({
            name: 'Outro evento',
            date: '2026-10-01'
        });

        expect(town.getEvents()).toHaveLength(1);
    });

    test('Deve alocar orçamento', () => {
        const result = town.allocateBudget('Saúde', 500000);

        expect(result).toBe(500000);
        expect(town.getBudget('Saúde')).toBe(500000);
    });

    test('Deve atualizar orçamento de uma categoria existente', () => {
        town.allocateBudget('Saúde', 500000);
        town.allocateBudget('Saúde', 750000);

        expect(town.getBudget('Saúde')).toBe(750000);
    });

    test('Não deve aceitar orçamento negativo', () => {
        expect(() => town.allocateBudget('Saúde', -100))
            .toThrow('Invalid budget');
    });

    test('Não deve aceitar categoria de orçamento inválida', () => {
        expect(() => town.allocateBudget('', 100))
            .toThrow('Invalid budget');

        expect(() => town.allocateBudget(undefined, 100))
            .toThrow('Invalid budget');
    });

    test('Deve retornar 0 para categoria sem orçamento', () => {
        expect(town.getBudget('Saúde')).toBe(0);
    });

    test('Deve calcular o orçamento total', () => {
        town.allocateBudget('Saúde', 500000);
        town.allocateBudget('Educação', 300000);
        town.allocateBudget('Segurança', 200000);

        expect(town.getTotalBudget()).toBe(1000000);
    });

    test('Deve retornar 0 quando não existem orçamentos', () => {
        expect(town.getTotalBudget()).toBe(0);
    });

    test('Deve fechar a administração', () => {
        const result = town.closeAdministration();

        expect(result).toBe(false);
        expect(town.isOpen()).toBe(false);
    });

    test('Deve reabrir a administração', () => {
        town.closeAdministration();

        const result = town.reopenAdministration();

        expect(result).toBe(true);
        expect(town.isOpen()).toBe(true);
    });

    test('A administração deve iniciar aberta', () => {
        expect(town.isOpen()).toBe(true);
    });

    test('Deve retornar o resumo da cidade', () => {
        town.addResident('Jonh');
        town.addResident('Maria');

        town.addService('Hospital');
        town.addService('Escola');

        town.scheduleEvent('Festa da Cidade', '2026-09-07');

        town.allocateBudget('Saúde', 500000);
        town.allocateBudget('Educação', 300000);

        expect(town.getSummary()).toEqual({
            name: 'Criciuma',
            mayor: 'Carlos Francisco',
            population: 1000002,
            residents: 2,
            services: 2,
            events: 1,
            totalBudget: 800000,
            isOperational: true
        });
    });

    test('Deve atualizar o resumo quando a administração for fechada', () => {
        town.closeAdministration();

        expect(town.getSummary()).toEqual({
            name: 'Criciuma',
            mayor: 'Carlos Francisco',
            population: 1000000,
            residents: 0,
            services: 0,
            events: 0,
            totalBudget: 0,
            isOperational: false
        });
    });
})
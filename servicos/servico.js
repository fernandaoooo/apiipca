import inflacaoHistorica from '../dados/dados.js';

export function obterDadosCompletos() {
    return inflacaoHistorica;
}

export function buscarPorAno(anoSelecionado) {
    return inflacaoHistorica.filter(registro => registro.ano === anoSelecionado);
}

export function calcularMediaPorAno(anoSelecionado) {
    const registrosAno = buscarPorAno(anoSelecionado);
    const total = registrosAno.reduce((acumulador, registro) => acumulador + registro.ipca, 0);
    return registrosAno.length > 0 ? (total / registrosAno.length).toFixed(2) : 0;
}

export function calcularAjuste(valorBase, mesInicio, anoInicio, mesFim, anoFim, registros) {
    const indiceInicial = registros.find(registro => registro.ano === anoInicio && registro.mes === mesInicio);
    const indiceFinal = registros.find(registro => registro.ano === anoFim && registro.mes === mesFim);

    if (!indiceInicial || !indiceFinal) {
        return null;  
    }

    const somaIndices = registros
        .filter(registro => (registro.ano > anoInicio || (registro.ano === anoInicio && registro.mes >= mesInicio)) &&
                            (registro.ano < anoFim || (registro.ano === anoFim && registro.mes <= mesFim)))
        .reduce((acumulador, registro) => acumulador + registro.ipca, 0);

    const valorAjustado = valorBase * (1 + somaIndices / 100);
    return valorAjustado.toFixed(2);  
}
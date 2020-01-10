import React, {useState, useEffect} from 'react';

//
//  Services
//
import Api from './../../Services/Api';

//
//  Styles
//
import './style.css';

//
//  Search Component
//

let brands = '';
let model = '';
let ano = '';

export default function Search () {

    const [marcas, setMarcas] = useState([]);
    const [veiculos, setVeiculos] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [veiculo, setVeiculo] = useState({});
    const [version, setVersion] = useState({});

    //
    //  Carrega as marcas
    //
    useEffect(()=>{

        function listaMarcas () {
            Api.getMarcas().then(res=>{
                setMarcas(res.data);
            });
        }

        listaMarcas();

    },[])

    function listaVeiculos (marca) {
        Api.getVeiculos(marca).then(res=>{
            brands = marca;

            setVeiculos(res.data);
            setModelos([]);
            setVeiculo({});
        });
    }

    function listaModelos ( marcaModelo ){
        model = marcaModelo;

        Api.getModelos(brands, marcaModelo).then(res=>{
            setModelos(res.data);
            setVeiculo({});
        })
    }

    function listaAnos ( marcaModeloAno ){
        ano = marcaModeloAno;

        Api.getVeiculo(brands, model, marcaModeloAno).then(res=>{
            setVeiculo(res.data);
            console.log('veiculo: ', veiculo);
            setVersion({});
        })
    }

    function listaVersion ( marcaModeloAnoVersion ){
        Api.getVersion(brands, model, ano, marcaModeloAnoVersion).then(res=>{
            setVersion(res.data);
        })
    }

    return(
        <div className="conteudo">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>Quanto vale meu carro?</h1>
                    </div>
                </div>
                {marcas.length > 0 &&
                <div className="row">
                    <form>
                        <fieldset>
                            <legend>Quanto vale meu carro?</legend>
                            <div className="col-xs-12 col-sm-3">
                                <div className="formGroup">
                                    <label htmlFor="marca">Selecione a Marca</label>
                                    <div className="sSelect">
                                        <select id="marca" onClick={e=>listaVeiculos(e.target.value)}>
                                            {marcas.map(marca=>(
                                                <option key={marca.id} value={marca.id}>{marca}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {veiculos.length > 0 &&
                            <div className="col-xs-12 col-sm-3">
                                <div className="formGroup">
                                    <label htmlFor="modelo">Selecione o Modelo</label>
                                    <div className="sSelect">
                                        <select id="modelo" onClick={e=>listaModelos(e.target.value)}>
                                            {veiculos.map((veiculo,idx)=>(
                                                <option key={idx} value={veiculo }>{veiculo}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            }

                            {modelos.length > 0 &&
                            <div className="col-xs-12 col-sm-3">
                                <div className="formGroup">
                                    <label htmlFor="ano">Selecione o Ano</label>
                                    <div className="sSelect">
                                        <select id="ano" onClick={e=>listaAnos(e.target.value)}>
                                            {modelos.map((modelo,idx)=>(
                                                <option key={idx} value={modelo}>{modelo}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            }

                            {veiculo.length > 0 &&
                            <div className="col-xs-12 col-sm-3">
                                <div className="formGroup">
                                    <label htmlFor="versionId">Selecione a Verção</label>
                                    <div className="sSelect">
                                        <select id="versionId" onClick={e=>listaVersion(e.target.value)}>
                                            {veiculo.map((version,idx)=>(
                                                <option key={idx} value={version.versionId}>{version.version}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            }

                        </fieldset>
                    </form>
                </div>
                }

                { Object.keys(version).length !== 0 &&
                <div className="row">
                    <div className="boxCarro">
                        <div className="row">
                            <table class="table table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">Marca</th>
                                        <th scope="col">Modelo</th>
                                        <th scope="col">Preço Minimo</th>
                                        <th scope="col">Preço Medio</th>
                                        <th scope="col">Preço Maximo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{version.brand}</td>
                                        <td>{version.model}</td>
                                        <td>{version.precoMinimo}</td>
                                        <td>{version.precoMedio}</td>
                                        <td>{version.precoMaximo}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">my-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ActivadesMecComponent.html" data-type="entity-link" >ActivadesMecComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ActividadesComponent.html" data-type="entity-link" >ActividadesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AngularNavComponent.html" data-type="entity-link" >AngularNavComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BaseComponent.html" data-type="entity-link" >BaseComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ClientesComponent.html" data-type="entity-link" >ClientesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DialogAuditoria.html" data-type="entity-link" >DialogAuditoria</a>
                            </li>
                            <li class="link">
                                <a href="components/DialogDataDelete.html" data-type="entity-link" >DialogDataDelete</a>
                            </li>
                            <li class="link">
                                <a href="components/DialogFacturas.html" data-type="entity-link" >DialogFacturas</a>
                            </li>
                            <li class="link">
                                <a href="components/EstadisticasComponent.html" data-type="entity-link" >EstadisticasComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FacturacionComponent.html" data-type="entity-link" >FacturacionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormAddActComponent.html" data-type="entity-link" >FormAddActComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormAddClienteComponent.html" data-type="entity-link" >FormAddClienteComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormAddFacturaComponent.html" data-type="entity-link" >FormAddFacturaComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormAddUsuarioComponent.html" data-type="entity-link" >FormAddUsuarioComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormAddVehiculoComponent.html" data-type="entity-link" >FormAddVehiculoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormEditActComponent.html" data-type="entity-link" >FormEditActComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormEditClienteComponent.html" data-type="entity-link" >FormEditClienteComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormEditUsuarioComponent.html" data-type="entity-link" >FormEditUsuarioComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormEditVehiculoComponent.html" data-type="entity-link" >FormEditVehiculoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeComponent.html" data-type="entity-link" >HomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InformesComponent.html" data-type="entity-link" >InformesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/Tabla_actividadesComponent.html" data-type="entity-link" >Tabla_actividadesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/Tabla_Dashboard.html" data-type="entity-link" >Tabla_Dashboard</a>
                            </li>
                            <li class="link">
                                <a href="components/TablaClientesComponent.html" data-type="entity-link" >TablaClientesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TablaFacturasComponent.html" data-type="entity-link" >TablaFacturasComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TablaUsuariosComponent.html" data-type="entity-link" >TablaUsuariosComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TablaVehiculosComponent.html" data-type="entity-link" >TablaVehiculosComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UsuariosComponent.html" data-type="entity-link" >UsuariosComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VehiculosComponent.html" data-type="entity-link" >VehiculosComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ActividadesDto.html" data-type="entity-link" >ActividadesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClienteDto.html" data-type="entity-link" >ClienteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FacturaDto.html" data-type="entity-link" >FacturaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UsuarioDto.html" data-type="entity-link" >UsuarioDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ActividadesService.html" data-type="entity-link" >ActividadesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClientesService.html" data-type="entity-link" >ClientesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FacturacionService.html" data-type="entity-link" >FacturacionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalService.html" data-type="entity-link" >GlobalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InformesService.html" data-type="entity-link" >InformesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuariosService.html" data-type="entity-link" >UsuariosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VehiculoService.html" data-type="entity-link" >VehiculoService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolGuard.html" data-type="entity-link" >RolGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Actividades.html" data-type="entity-link" >Actividades</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Auditoria.html" data-type="entity-link" >Auditoria</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Cliente.html" data-type="entity-link" >Cliente</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Facturas.html" data-type="entity-link" >Facturas</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserData.html" data-type="entity-link" >UserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Usuario.html" data-type="entity-link" >Usuario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Vehiculo.html" data-type="entity-link" >Vehiculo</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
import { Component, ComponentInterface, h, Prop, State } from '@stencil/core';
import pbi from "powerbi-client";

import { models, IEmbedConfiguration } from "powerbi-client"

const powerbi = new pbi.service.Service(
  pbi.factories.hpmFactory,
  pbi.factories.wpmpFactory,
  pbi.factories.routerFactory
);


@Component({
  tag: 'wiz-powerbi',
  styleUrl: 'wiz-powerbi.css',
  shadow: true
})
export class WizPowerbi implements ComponentInterface {

  // Principal
  @Prop() idPbi: string; // use id-pbi=""
  @Prop() token: string;
  @Prop() embedUrl: string // use embed-url=""

  // Opcional
  @Prop() tokenType: models.TokenType = 0
  @Prop() type: string = 'report'
  @Prop() showFilterBar: boolean = false
  @Prop() showMenuButton: boolean = true
  @Prop() filters: models.IFilter[];
  @Prop() maxMobileSize: number;

  // State has change
  @State() config: IEmbedConfiguration;
  @State() onEmbedded: (embeddedEl: any) => void;

  public contentPBI: HTMLElement;
  private embeddedElement: pbi.Embed;

  /// initial
  componentDidLoad() {
    this.loadPbi()
  }
  /// Refresh params
  componentWillUpdate() {
    this.loadPbi()
  }

  ///////////////////////
  // @Events components
  ///////////////////////
  loadPbi() {
    if (this.validateConfig()) {
      this.embed(this.config);
    }
  }

  ///////////////////////
  // Validations
  ///////////////////////
  validateConfig() {
    const config = this.getConfig()
    const errors = pbi.models.validateReportLoad(config);
    if (!this.token || !this.idPbi || !this.embedUrl) {
      console.warn('required token, id and embedUrl')
      return false
    }
    if (errors) {
      console.log("config validation error", errors);
    }
    this.config = config
    return errors === undefined;
  }



  // Prepare params config powerbi
  private getConfig() {
    let newConfig: IEmbedConfiguration = {
      embedUrl: this.embedUrl,
      id: this.idPbi,
      accessToken: this.token,
      tokenType: this.tokenType,
      type: this.type,
      settings: {
        filterPaneEnabled: this.showFilterBar,
        navContentPaneEnabled: this.showMenuButton,
        layoutType: 0
      }
    }

    // has Filters
    if (this.filters) {
      const values = newConfig
      newConfig = {
        ...values,
        filters: this.filters
      }
    }

    /// is Mobile
    const bodySize = document.body.getBoundingClientRect().width;
    if (this.maxMobileSize && bodySize >= this.maxMobileSize) {
      newConfig.settings.layoutType = pbi.models.LayoutType.MobilePortrait
    }
    return newConfig
  }


  ///////////////////////////////
  /// @events power-bi client
  ///////////////////////////////
  embed(config: IEmbedConfiguration) {
    this.embeddedElement = powerbi.embed(this.contentPBI, config);
    if (this.onEmbedded) {
      this.onEmbedded(this.embeddedElement);
    }
    return this.embeddedElement;
  }

  // Renderização do componente
  render() {
    return (
      <div class="content-powerbi" ref={el => { this.contentPBI = el; }}></div>
    );
  }
}

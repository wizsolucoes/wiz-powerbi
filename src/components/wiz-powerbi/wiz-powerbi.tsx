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




  // lyfe cicle stencil
  componentWillLoad() {
    this.initialEventPbi();
  }

  componentDidLoad() {
    if (this.validateConfig(this.config)) {
      this.embed(this.config);
    }
  }


  ///////////////////////
  // @Events components
  ///////////////////////
  initialEventPbi() {
    // const errors = pbi.models.validateReportLoad(config);
    if (!this.token || !this.idPbi) {
      return
    }
    this.config = this.getConfig()
  }


  // Prepare params config powerbi
 private getConfig() {
   let newConfig: IEmbedConfiguration  = {
     embedUrl: this.embedUrl,
     id: this.idPbi,
     accessToken: this.token,
     tokenType: this.tokenType,
     type: this.type,
     settings: {
       filterPaneEnabled: this.showFilterBar,
       navContentPaneEnabled: this.showMenuButton
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
     newConfig.settings.layoutType = 1
   }


   return newConfig
 }


  ///////////////////////////////
  /// @events power-bi client
  ///////////////////////////////
  validateConfig(config: IEmbedConfiguration ) {
    const errors = pbi.models.validateReportLoad(config);
    if (errors) {
      console.log("config validation error", errors);
    }
    return errors === undefined;
  }

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

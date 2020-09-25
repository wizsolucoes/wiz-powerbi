import { Component, ComponentInterface, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import pbi from "powerbi-client";

import { models, IEmbedConfiguration } from "powerbi-client"

const powerbi = new pbi.service.Service(
  pbi.factories.hpmFactory,
  pbi.factories.wpmpFactory,
  pbi.factories.routerFactory
);


@Component({
  tag: "wiz-powerbi",
  styleUrl: "wiz-powerbi.css",
  shadow: true,
})
export class WizPowerbi implements ComponentInterface {
  // Principal
  @Prop() idPbi: string; // use id-pbi=""
  @Prop() token: string;
  @Prop() embedUrl: string; // use embed-url=""

  // Opcional
  @Prop() tokenType: models.TokenType = 0;
  @Prop() type: string = "report";
  @Prop() showFilterBar: boolean = false;
  @Prop() showMenuButton: boolean = true;
  @Prop() filters: models.IFilter[];
  @Prop() maxMobileSize: number = 800;
  @Prop() pageName: string

  // State has change
  @State() onEmbedded: (embeddedEl: any) => void;
  // @State() config: IEmbedConfiguration = {};
  @State() status: string = "";

  // Events output
  @Event() changeStatus: EventEmitter<string>;

  public contentPBI: HTMLElement;
  private embeddedElement: pbi.Embed;

  /// initial
  componentDidLoad() {
    this.loadPbi();
  }

  @Watch("filters")
  @Watch("idPbi")
  @Watch("token")
  @Watch("embedUrl")
  addChild() {
    this.loadPbi();
  }

  emitStatus() {
    this.embeddedElement.on("rendered", () => {
      this.status = "rendered";
      this.changeStatus.emit("rendered");
    });
    this.embeddedElement.on("loaded", () => {
      this.status = "loaded";
      this.changeStatus.emit("loaded");
    });
  }

  ///////////////////////
  // @Events components
  ///////////////////////
  loadPbi() {
    if (this.validateConfig()) {
      this.embed();
      this.emitStatus();
    }
  }

  ///////////////////////
  // Validations
  ///////////////////////
  validateConfig() {
    const config = this.getConfig();
    const errors = pbi.models.validateReportLoad(config);
    if (!this.token || !this.idPbi || !this.embedUrl) {
      return false;
    }
    if (errors) {
      return;
    }
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
        layoutType: 0,
      },
    };

    // has Page Name
    if(this.pageName) {
      newConfig.pageName = this.pageName;
    }

    // has Filters
    if (this.filters) {
      const values = newConfig;
      newConfig = {
        ...values,
        filters: this.filters,
      };
    }

    /// is Mobile
    const bodySize = document.body.getBoundingClientRect().width;
    if (this.maxMobileSize && this.maxMobileSize >= bodySize) {
      newConfig.settings.layoutType = pbi.models.LayoutType.MobilePortrait;
    }
    return newConfig;
  }

  ///////////////////////////////
  /// @events power-bi client
  ///////////////////////////////
  embed() {
    const config = this.getConfig();
    this.embeddedElement = powerbi.embed(this.contentPBI, config);

    if (this.onEmbedded) {
      this.onEmbedded(this.embeddedElement);
    }
    return this.embeddedElement;
  }

  // Renderização do componente
  render() {
    return (
      <div
        id="content-powerbi"
        class={`pbi-status-${this.status}`}
        ref={(el) => {
          this.contentPBI = el;
        }}
      ></div>
    );
  }
}

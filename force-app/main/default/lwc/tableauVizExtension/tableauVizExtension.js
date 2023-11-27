import { LightningElement, api, wire } from 'lwc';
import { subscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import TABLEAU_VIZ_EXTENSION_MC from '@salesforce/messageChannel/TableauVizExtensionMessageChannel__c';

export default class TableauVizExtension extends LightningElement {
    @api vizUrl;
    @api height;
    @api showTabs;
    @api showToolbar

    parameters = null;
    subscription = null;
    showDashboard = true;

    @wire(MessageContext)
    messageContext;

    get tableauUrl() {
        if (!this.parameters) {
            return this.vizUrl;
        }

        let urlWithParameters = this.vizUrl;

        for (const [key, value] of Object.entries(this.parameters)) {
            urlWithParameters = `${urlWithParameters}&${key}=${value}`;
        }

        return urlWithParameters;
    }

    connectedCallback() {
        this.subscribeMC();
    }

    subscribeMC() {
        if (this.subscription) {
            return;
        }

        this.subscription = subscribe(
            this.messageContext,
            TABLEAU_VIZ_EXTENSION_MC,
            (msg) => {this.handleMessage(msg)},
            { scope: APPLICATION_SCOPE }
        );
    }

    handleMessage(message) {
        this.parameters = message.parameters;

        this.refreshTableauViz();
    }

    refreshTableauViz() {
        // Tableau Viz component doesn't refresh when the viz-url is update, so we need to force a refresh.
        this.showDashboard = false;
        
        setTimeout(() => {
            this.showDashboard = true;
        }, 100);       
    }
}
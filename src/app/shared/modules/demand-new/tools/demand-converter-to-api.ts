import { DemandEDSDataInterface } from '../types/demand-form-data/demand-eds-data.interface';
import { OrganizationDataInterface } from 'src/app/shared/types/organization/organization-data.interface';
import { PersonInterface } from 'src/app/shared/types/common/person.interface';
import { PassportInterface } from 'src/app/shared/types/user/passport.interface';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { CreateDemandEDSRequestInterface } from '../types/requests/create-demand-eds-request.interface';
import { DemandEDIInterface } from '../types/demand-edi.interface';
import { DemandObligationInterface } from '../types/demand-obligation.interface';
import { DemandAddonAccountInterface } from '../types/demand-addon-account.interface';
import { DemandPropertiesInterface } from '../types/demand-properties.interface';
import { CreateDemandFactoringRequestInterface } from '../types/requests/create-demand-factoring-request.interface';

export class DemandConverterToAPI {
  public convertEDSToApiData(
    form: DemandEDSDataInterface,
    files: FileModeInterface[]
  ) {
    let organization: OrganizationDataInterface = {
      Email: form.organizationEmail,
      FactAddress: form.organizationActualAddress.factoringPlacesAddress,
      FactAddressEquals: form.organizationIsActualAdressEqual,
      ForeignTitle: '',
      FullTitle: form.organizationFullName,
      LegalAddress: form.organizationLegalAddress.factoringPlacesAddress,
      LegalForm: form.organizationLegalForm,
      Phone: form.organizationPhone,
      PostAddress: form.organizationPostAddress.factoringPlacesAddress,
      PostAddressEquals: form.organizationIsLegalAdressEqual,
      Requisites: {
        INN: form.organizationINN,
        KPP: form.organizationKPP,
        OGRN: form.organizationOGRN,
        OKATO: '',
        OKPO: form.organizationOKPO,
      },
      ShortTitle: form.organizationShortName,
      Type: form.organizationType,
      Website: form.organizationWEB,
    };

    let passport: PassportInterface = {
      Date: form?.passportDate
        ? new Date(form.passportDate).toISOString().slice(0, 19) + '+03:00'
        : null,
      IsForeign: false,
      IssuerCode: form.passportCode,
      IssuerTitle: form.passportFrom,
      Nationality: form.passportNationality,
      Number: form.passportNumber,
    };

    let person: PersonInterface = {
      Name: {
        First: '',
        Last: '',
        Second: '',
      },

      NameFirst: form.ownerName,
      NameLast: form.ownerSurname,
      NameSecond: form.ownerMiddlename,
      Gender: form.ownerGender,

      SNILS: form.ownerSNILS,
      BirthDate: new Date(form.ownerDateBurn),
      BirthPlace: form.ownerPlaceBurn,

      Phone: form.ownerPhone,
      Email: form.ownerEmail,
      INN: form.ownerINN,
    };

    let data: CreateDemandEDSRequestInterface = {
      Files: files,
      Organization: organization,
      Passport: passport,
      Person: person,
      PersonPosition: form.ownerWorkPosition,
      Type: 'DigitalSignature',
    };
    return data;
  }

  convertVerifyToApiData(form: any, files: FileModeInterface[]) {
    let DocumentTypes: string[] = [];

    if (form.DocumentTypeTorg12) {
      DocumentTypes.push('Torg12');
    }
    if (form.DocumentTypeInvoice) {
      DocumentTypes.push('Invoice');
    }
    if (form.DocumentTypeAcceptance) {
      DocumentTypes.push('Acceptance');
    }
    if (form.DocumentTypeNonformalized) {
      DocumentTypes.push('Nonformalized');
    }
    if (form.DocumentTypeORDER) {
      DocumentTypes.push('ORDER');
    }
    if (form.DocumentTypeRECADV) {
      DocumentTypes.push('RECADV');
    }

    let result: any = {
      DocumentTypes,
      Comment: form.Comment,
      DebtorID: form.DebtorID,
      GLN: form.GLN,
      VerificationType: form.VerificationType,
      Type: 'VerificationChannel',
    };

    return result;
  }

  convertDebitorToApiData(form: any, files: FileModeInterface[]) {
    let result = {
      ID: form.ID,
      INN: form.INN,
      IsNew: form.IsNew,
      Title: form.Title,
      Files: files,
      Type: 'NewDebtor',
    };
    return result;
  }

  convertLimitToApiData(form: any, files: FileModeInterface[]) {
    let result = {
      Limit: form.limit,
      Comment: form.comment,
      Files: files,
      Type: 'Limit',
    };
    return result;
  }

  public convertFreeToApiData(form: any, files: FileModeInterface[]) {
    let result: any = {
      Question: form.question,
      Subject: form.subject,
      Files: files,
      Type: 'Question',
    };

    return result;
  }

  public convertProfileToApiData(form: any, files: FileModeInterface[]) {
    let result: any = {
      Avatar: form.avatarCode,
      Passport: {
        Date: form.date
          ? new Date(form.date).toISOString().slice(0, 19) + '+03:00'
          : null,
        Expire: null,
        IsForeign: false,
        IssuerCode: form.issuerCode,
        IssuerTitle: form.issuerTitle,
        Nationality: 'RUS',
        Number: form.number,
      },
      PassportFileCode: '',
      Profile: {
        Email: form.email,
        IsMale: form.isMale,
        Name: {
          First: form.first,
          Last: form.last,
        },
        Phone: form.phone,
      },
      Files: files,
      UserID: form.currentUserId,
      Type: 'ProfileChange',
    };

    return result;
  }

  public convertSuretyToApiData(form: any, files: FileModeInterface[]) {
    let listEDI: DemandEDIInterface[] = [];

    let listObligations: DemandObligationInterface[] = [];
    let listAddonAccounts: DemandAddonAccountInterface[] = [];
    let listProperties: DemandPropertiesInterface[] = [];

    let properties = form.factoringPlaces; //.value.factoringPlaces;
    properties.forEach((property) => {
      listProperties.push({
        Address: {
          Appartment: property.factoringPlacesAddress.Appartment,
          City: property.factoringPlacesAddress.City,
          Country: property.factoringPlacesAddress.Country,
          District: property.factoringPlacesAddress.District,
          House: property.factoringPlacesAddress.House,
          Locality: property.factoringPlacesAddress.Locality,
          PostCode: property.factoringPlacesAddress.PostCode,
          RegionCode: property.factoringPlacesAddress.RegionCode,
          Street: property.factoringPlacesAddress.Street,
          RegionTitle: property.factoringPlacesAddress.RegionTitle,
        },
        Comment: '',
        Type: property.factoringPlacesLegalForm,
      });
    });

    let obligations = form.factoringCredits;
    obligations.forEach((obligation) => {
      listObligations.push({
        Creditor: obligation.factoringCreditsCreditor,
        CurrentRest: obligation.factoringPlacesBalanceCurrent,
        Date: new Date(obligation.factoringPlacesDateClose),
        ReportingRest: obligation.factoringPlacesBalanceReport,
        Summ: obligation.factoringPlacesContractSum,
        Type: obligation.factoringPlacesTypeDuty,
      });
    });

    let addonAccounts = form.otherBanks;
    addonAccounts.forEach((addonAccount) => {
      listAddonAccounts.push({
        BIK: '',
        Bank: addonAccount.otherBankName,
        COR: '',
        Comment: addonAccount.otherBankTarget,
        Date: new Date(addonAccount.otherBankAccountOpenDate),
        Expire: new Date(addonAccount.otherBankAccountCloseDate),
        Number: addonAccount.otherBankOwnerAccount,
      });
    });

    let edis = form.factoringEDIProviders;
    edis.forEach((edi) => {
      listEDI.push({
        Company: edi.factoringEDIProvidersDebitor,
        EDIProvider: edi.factoringEDIProvidersProvider,
      });
    });

    let result: CreateDemandFactoringRequestInterface = {
      Anket: {
        Registration: {
          Authority: '',
          Date: new Date(),
          InitDate: new Date(),
          Number: '',
          Place: '',
        },
        Resident: {
          Country: 'РФ',
          ForeignCode: '',
          IsResident: true,
        },
        Shareholders: [],
        Signer: {
          FactAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
          Passport: {
            Date: new Date(),
            Expire: new Date(),
            IsForeign: false,
            IssuerCode: '',
            IssuerTitle: '',
            Nationality: '',
            Number: '',
          },
          Person: {
            BirthDate: new Date(),
            BirthPlace: '',
            Email: '',
            Gender: 1,
            Name: {
              First: '',
              Last: '',
              Second: '',
            },
            NameFirst: '',
            NameLast: '',
            NameSecond: '',
            Phone: '',
            SNILS: '',
          },
          PositionDate: new Date(),
          PositionTitle: '',
          RegistrationAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
        },
        Activities: [],
        Capital: {
          Total: 0,
          Payed: 0,
        },
        Licenses: [],
        Objectives: {
          BankRelationObjective: 16,
          BankRelationObjectiveOther: '',
          FinancialObjective: 1,
          FinancialObjectiveOther: '',
          TransactionsContracts: 'Договор факторинга',
          TransactionsCount: '',
          TransactionsSumm: '',
        },
        Organization: {
          Email: form.organizationEmail,
          FactAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
          FactAddressEquals: false,
          ForeignTitle: '',
          FullTitle: '',
          LegalAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
          LegalForm: form.organizationLegalForm,
          Phone: form.organizationPhone,
          PostAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
          PostAddressEquals: false,
          Requisites: {
            INN: form.organizationINN,
            KPP: '',
            OGRN: '',
            OKATO: '',
            OKPO: '',
          },
          ShortTitle: form.organizationShortName,
          Type: form.organizationType,
          Website: form.organizationWEB,
        },
      },
      Factoring: {
        Account: {
          BIK: form.bankBik,
          Bank: form.bankName,
          COR: form.bankCorrespondentAccount,
          Comment: form.bankComment,
          Date: new Date(form.bankAccountOpenDate),
          Expire: null,
          Number: form.bankOwnerAccount,
        },
        AddonAccounts: listAddonAccounts,
        Buyers: form.factoringClients,
        EDI: listEDI,
        FactoringAim: 0,
        LimitWanted: form.factoringFinanceLimit,
        Obligations: listObligations,
        Products: form.factoringProducts,
        Properties: listProperties,
        StaffAmount: form.factoringWorkers,
        Suppliers: form.factoringShipments,
        Trademarks: form.factoringTradeMarks,
      },
      Files: files,
      Type: 'Guarantee',
    };

    return result;
  }

  public convertAgentFactoringToApiData(form: any, files: FileModeInterface[]) {
    let listEDI: DemandEDIInterface[] = [];

    let listObligations: DemandObligationInterface[] = [];
    let listAddonAccounts: DemandAddonAccountInterface[] = [];
    let listProperties: DemandPropertiesInterface[] = [];

    let properties = form.factoringPlaces;
    properties.forEach((property) => {
      listProperties.push({
        Address: {
          Appartment: property.factoringPlacesAddress.Appartment,
          City: property.factoringPlacesAddress.City,
          Country: property.factoringPlacesAddress.Country,
          District: property.factoringPlacesAddress.District,
          House: property.factoringPlacesAddress.House,
          Locality: property.factoringPlacesAddress.Locality,
          PostCode: property.factoringPlacesAddress.PostCode,
          RegionCode: property.factoringPlacesAddress.RegionCode,
          Street: property.factoringPlacesAddress.Street,
          RegionTitle: property.factoringPlacesAddress.RegionTitle,
        },
        Comment: '',
        Type: property.factoringPlacesLegalForm,
      });
    });

    let obligations = form.factoringCredits;
    obligations.forEach((obligation) => {
      listObligations.push({
        Creditor: obligation.factoringCreditsCreditor,
        CurrentRest: obligation.factoringPlacesBalanceCurrent,
        Date: new Date(obligation.factoringPlacesDateClose),
        ReportingRest: obligation.factoringPlacesBalanceReport,
        Summ: obligation.factoringPlacesContractSum,
        Type: obligation.factoringPlacesTypeDuty,
      });
    });

    let addonAccounts = form.otherBanks;
    addonAccounts.forEach((addonAccount) => {
      listAddonAccounts.push({
        BIK: '',
        Bank: addonAccount.otherBankName,
        COR: '',
        Comment: addonAccount.otherBankTarget,
        Date: new Date(addonAccount.otherBankAccountOpenDate),
        Expire: new Date(addonAccount.otherBankAccountCloseDate),
        Number: addonAccount.otherBankOwnerAccount,
      });
    });

    let result: any = {
      Anket: {
        Registration: {
          Authority: '',
          Date: new Date(),
          InitDate: new Date(),
          Number: '',
          Place: '',
        },
        Resident: {
          Country: 'РФ',
          ForeignCode: '',
          IsResident: true,
        },
        Shareholders: [],
        Signer: {
          FactAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
          Passport: {
            Date: new Date(),
            Expire: new Date(),
            IsForeign: false,
            IssuerCode: '',
            IssuerTitle: '',
            Nationality: '',
            Number: '',
          },
          Person: {
            BirthDate: new Date(),
            BirthPlace: '',
            Email: '',
            Gender: 1,
            Name: {
              First: '',
              Last: '',
              Second: '',
            },
            NameFirst: '',
            NameLast: '',
            NameSecond: '',
            Phone: '',
            SNILS: '',
          },
          PositionDate: new Date(),
          PositionTitle: '',
          RegistrationAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
        },
        Activities: [],
        Capital: {
          Total: 0,
          Payed: 0,
        },
        Licenses: [],
        Objectives: {
          BankRelationObjective: 16,
          BankRelationObjectiveOther: '',
          FinancialObjective: 1,
          FinancialObjectiveOther: '',
          TransactionsContracts: 'Договор факторинга',
          TransactionsCount: '',
          TransactionsSumm: '',
        },
        Organization: {
          Email: form.organizationEmail,
          FactAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
          FactAddressEquals: false,
          ForeignTitle: '',
          FullTitle: '',
          LegalAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
          LegalForm: form.organizationLegalForm,
          Phone: form.organizationPhone,
          PostAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
          PostAddressEquals: false,
          Requisites: {
            INN: form.organizationINN,
            KPP: '',
            OGRN: '',
            OKATO: '',
            OKPO: '',
          },
          ShortTitle: form.organizationShortName,
          Type: form.organizationType,
          Website: form.organizationWEB,
        },
      },
      Factoring: {
        Account: {
          BIK: form.bankBik,
          Bank: form.bankName,
          COR: form.bankCorrespondentAccount,
          Comment: form.bankComment,
          Date: new Date(form.bankAccountOpenDate),
          Expire: null,
          Number: form.bankOwnerAccount,
        },
        AddonAccounts: listAddonAccounts,
        Buyers: form.factoringClients,
        EDI: listEDI,
        FactoringAim: 0,
        LimitWanted: form.factoringFinanceLimit,
        Obligations: listObligations,
        Products: form.factoringProducts,
        Properties: listProperties,
        StaffAmount: form.factoringWorkers,
        Suppliers: form.factoringShipments,
        Trademarks: form.factoringTradeMarks,
      },
      Files: files,
      Type: 'AgencyFactoring',
    };

    return result;
  }

  public convertFactoringToApiData(form: any, files: FileModeInterface[]) {
    let listEDI: DemandEDIInterface[] = [];

    let listObligations: DemandObligationInterface[] = [];
    let listAddonAccounts: DemandAddonAccountInterface[] = [];
    let listProperties: DemandPropertiesInterface[] = [];

    if (form?.factoringPlaces?.length > 0) {
      let properties = form.factoringPlaces;
      properties.forEach((property) => {
        listProperties.push({
          Address: {
            Appartment: property.factoringPlacesAddress.Appartment,
            City: property.factoringPlacesAddress.City,
            Country: property.factoringPlacesAddress.Country,
            District: property.factoringPlacesAddress.District,
            House: property.factoringPlacesAddress.House,
            Locality: property.factoringPlacesAddress.Locality,
            PostCode: property.factoringPlacesAddress.PostCode,
            RegionCode: property.factoringPlacesAddress.RegionCode,
            Street: property.factoringPlacesAddress.Street,
            RegionTitle: property.factoringPlacesAddress.RegionTitle,
          },
          Comment: '',
          Type: property.factoringPlacesLegalForm,
        });
      });
    }

    if (form?.factoringCredits?.length > 0) {
      let obligations = form.factoringCredits;
      obligations.forEach((obligation) => {
        listObligations.push({
          Creditor: obligation.factoringCreditsCreditor,
          CurrentRest: obligation.factoringPlacesBalanceCurrent,
          Date: new Date(obligation.factoringPlacesDateClose),
          ReportingRest: obligation.factoringPlacesBalanceReport,
          Summ: obligation.factoringPlacesContractSum,
          Type: obligation.factoringPlacesTypeDuty,
        });
      });
    }

    if (form?.otherBanks?.length > 0) {
      let addonAccounts = form.otherBanks;
      addonAccounts.forEach((addonAccount) => {
        listAddonAccounts.push({
          BIK: '',
          Bank: addonAccount.otherBankName,
          COR: '',
          Comment: addonAccount.otherBankTarget,
          Date: new Date(addonAccount.otherBankAccountOpenDate),
          Expire: new Date(addonAccount.otherBankAccountCloseDate),
          Number: addonAccount.otherBankOwnerAccount,
        });
      });
    }

    if (form?.factoringEDIProviders?.length > 0) {
      let edis = form.factoringEDIProviders;
      edis.forEach((edi) => {
        listEDI.push({
          Company: edi.factoringEDIProvidersDebitor,
          EDIProvider: edi.factoringEDIProvidersProvider,
        });
      });
    }

    let result: CreateDemandFactoringRequestInterface = {
      Anket: {
        Registration: {
          Authority: '',
          Date: new Date(),
          InitDate: new Date(),
          Number: '',
          Place: '',
        },
        Resident: {
          Country: 'РФ',
          ForeignCode: '',
          IsResident: true,
        },
        Shareholders: [],
        Signer: {
          FactAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
          Passport: {
            Date: new Date(),
            Expire: new Date(),
            IsForeign: false,
            IssuerCode: '',
            IssuerTitle: '',
            Nationality: '',
            Number: '',
          },
          Person: {
            BirthDate: new Date(),
            BirthPlace: '',
            Email: '',
            Gender: 1,
            Name: {
              First: '',
              Last: '',
              Second: '',
            },
            NameFirst: '',
            NameLast: '',
            NameSecond: '',
            Phone: '',
            SNILS: '',
          },
          PositionDate: new Date(),
          PositionTitle: '',
          RegistrationAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
        },
        Activities: [],
        Capital: {
          Total: 0,
          Payed: 0,
        },
        Licenses: [],
        Objectives: {
          BankRelationObjective: 16,
          BankRelationObjectiveOther: '',
          FinancialObjective: 1,
          FinancialObjectiveOther: '',
          TransactionsContracts: 'Договор факторинга',
          TransactionsCount: '',
          TransactionsSumm: '',
        },
        Organization: {
          Email: form.organizationEmail ? form.organizationEmail : '',
          FactAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
          FactAddressEquals: false,
          ForeignTitle: '',
          FullTitle: '',
          LegalAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
          LegalForm: form.organizationLegalForm
            ? form.organizationLegalForm
            : '',
          Phone: form.organizationPhone ? form.organizationPhone : '',
          PostAddress: {
            Appartment: '',
            City: '',
            Country: '',
            District: '',
            House: '',
            Locality: '',
            PostCode: '',
            RegionCode: 0,
            RegionTitle: '',
            Street: '',
          },
          PostAddressEquals: false,
          Requisites: {
            INN: form.organizationINN ? form.organizationINN : '',
            KPP: '',
            OGRN: '',
            OKATO: '',
            OKPO: '',
          },
          ShortTitle: form.organizationShortName
            ? form.organizationShortName
            : '',
          Type: form.organizationType ? form.organizationType : '',
          Website: form.organizationWEB ? form.organizationWEB : '',
        },
      },
      Factoring: {
        Account: {
          BIK: form.bankBik ? form.bankBik : '',
          Bank: form.bankName ? form.bankName : '',
          COR: form.bankCorrespondentAccount
            ? form.bankCorrespondentAccount
            : '',
          Comment: form.bankComment ? form.bankComment : '',
          Date: form.bankAccountOpenDate
            ? new Date(form.bankAccountOpenDate)
            : null,
          Expire: null,
          Number: form.bankOwnerAccount ? form.bankOwnerAccount : '',
        },
        AddonAccounts: listAddonAccounts,
        Buyers: form.factoringClients ? form.factoringClients : '',
        EDI: listEDI,
        FactoringAim: 0,
        LimitWanted: form.factoringFinanceLimit
          ? form.factoringFinanceLimit
          : 0,
        Obligations: listObligations,
        Products: form.factoringProducts ? form.factoringProducts : '',
        Properties: listProperties,
        StaffAmount: form.factoringWorkers ? form.factoringWorkers : '',
        Suppliers: form.factoringShipments ? form.factoringShipments : '',
        Trademarks: form.factoringTradeMarks ? form.factoringTradeMarks : '',
      },
      Files: files,
      Type: 'Factoring',
    };

    return result;
  }
}

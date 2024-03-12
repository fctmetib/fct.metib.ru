export interface NewsInterface {
	ID: number
	Title: string
	Date: string
	FileReference: string
	Text: string
}

export interface AdvancedNewsInterface extends NewsInterface {
	Image: any
}

// export interface NewsInterface {
//     ID?: number;
//     Image: string;
//     Title: string;
//     Date: string;
//     Desc: string;
//     Text: string;
//   }

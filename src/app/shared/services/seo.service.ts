import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private meta: Meta, private title: Title) {}

  updateMetaTags(config: {
    title?: string;
    description?: string;
    image?: string;
    ogDescription?: string;
  }) {
    if (config.title) {
      this.title.setTitle(config.title);
      this.meta.updateTag({ name: 'title', content: config.title });
    }
    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
      this.meta.updateTag({ name: 'og:description', content: config.ogDescription || config.description });
    }
    if (config.image) {
      this.meta.updateTag({ name: 'og:image', content: config.image });
    }
  }
}

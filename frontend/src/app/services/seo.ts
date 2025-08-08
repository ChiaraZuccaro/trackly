import { inject, Injectable } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { HOME_SEO } from "@data/seo.data";
import { PAGE, SeoConfig } from "@interfaces/seo.interface";
import { META_TAGS_MAP } from "@utils/meta_mapper";

@Injectable({ providedIn: 'root' })
export class Seo {
  private _title = inject(Title);
  private _meta = inject(Meta);
  // private _translate = inject(TranslateService);

  private allPagesMeta: Record<PAGE, SeoConfig> = {
    home: HOME_SEO
  }

  private setTranslatedTitle(keyTranslation: string) {
    // const translation = this._translate.instant(keyTranslation);
    // this._title.setTitle(translation);
  }

  private setTranslatedMeta(metaMapped: { attr: "name" | "property"; tag: string; }, keyTranslation: string) {
    // this._translate.get(keyTranslation).subscribe(value => {
    //   this._meta.updateTag({
    //     [metaMapped.attr]: metaMapped.tag,
    //     content: value
    //   });
    // });
  }

  private updateCanonical(url: string) {
    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
    if (link) {
      link.setAttribute('href', url);
    } else {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      document.head.appendChild(link);
    }
  }

  public updateMetaTag(page: PAGE) {
    const pageConfig = this.allPagesMeta[page];

    if(pageConfig.title) this.setTranslatedTitle(pageConfig.title);

    for(const [key, value] of Object.entries(pageConfig)) {
      if(!value || key === 'title' || key === 'canonical') continue;

      const metaMapped = META_TAGS_MAP[key];
      if(metaMapped) this.setTranslatedMeta(metaMapped, value);
    }

    if(pageConfig.canonical) this.updateCanonical(pageConfig.canonical);
  }
}
import { Component, ElementRef, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mib-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextEditorComponent),
      multi: true,
    },
  ],
})
export class TextEditorComponent implements ControlValueAccessor {
    @ViewChild('editorContent', { static: true }) editorContent: ElementRef<HTMLDivElement>;
    content: string = '';
  
    onChange = (content: string) => {};
    onTouched = () => {};
  
    writeValue(content: string): void {
      this.content = content;
      if (this.editorContent) {
        this.editorContent.nativeElement.innerHTML = this.content || '';
      }
    }
  
    registerOnChange(fn: any): void {
      this.onChange = fn;
    }
  
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }
  
    format(command: string, value?: string) {
      document.execCommand(command, false, value);
      this.updateContent();
    }
  
    formatLink() {
        let url = window.prompt('Enter URL:');
        
        if (url && !/^https?:\/\//i.test(url)) {
          url = 'http://' + url;
        }
        
        if (url) {
          this.format('createLink', url);
        }
      }
      
  
    onInput(event: Event) {
      this.updateContent();
    }
  
    updateContent() {
      const element = this.editorContent.nativeElement;
      this.content = element.innerHTML;
      this.onChange(this.content);
    }
}

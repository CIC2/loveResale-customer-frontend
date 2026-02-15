import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { FileUploadModule, FileSelectEvent } from 'primeng/fileupload';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-property-media-form',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoPipe,
    FileUploadModule,
    SvgIconComponent,
  ],
  templateUrl: './property-media-form.html',
  styleUrl: './property-media-form.scss',
})
export class PropertyMediaForm {
  mediaChange = output<{ images: string[] }>();

  uploadedImages = signal<string[]>([]);

  onFileSelect(event: FileSelectEvent): void {
    const files = event.files;
    const newImages: string[] = [];

    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          newImages.push(e.target.result as string);
          if (newImages.length === files.length) {
            this.uploadedImages.update((current) => [...current, ...newImages]);
            this.mediaChange.emit({ images: this.uploadedImages() });
          }
        }
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    this.uploadedImages.update((current) => 
      current.filter((_, i) => i !== index)
    );
    this.mediaChange.emit({ images: this.uploadedImages() });
  }
}

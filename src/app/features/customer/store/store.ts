import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { StoreService } from '../../../core/services/store.service';
import { Branch, Category, Product } from '../../../core/models/store.model';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store.html',
  styleUrl: './store.scss',
})
export class StoreComponent implements OnInit {
  private readonly storeService = inject(StoreService);

  branches: Branch[] = [];
  categories: Category[] = [];
  products: Product[] = [];

  selectedBranchId = '';
  selectedCategoryId = '';

  loading = true;
  errorMessage = '';

  async ngOnInit(): Promise<void> {
    try {
      this.branches = await this.storeService.getBranches();

      if (this.branches.length > 0) {
        await this.selectBranch(this.branches[0].id);
      }
    } catch (error) {
      console.error(error);
      this.errorMessage = 'โหลดข้อมูลร้านไม่สำเร็จ';
    } finally {
      this.loading = false;
    }
  }

  async selectBranch(branchId: string): Promise<void> {
    this.selectedBranchId = branchId;
    this.selectedCategoryId = '';
    this.loading = true;
    this.errorMessage = '';

    try {
      const [categories, products] = await Promise.all([
        this.storeService.getCategories(branchId),
        this.storeService.getProducts(branchId),
      ]);

      this.categories = categories;
      this.products = products;
    } catch (error) {
      console.error(error);
      this.errorMessage = 'โหลดเมนูของสาขาไม่สำเร็จ';
    } finally {
      this.loading = false;
    }
  }

  async selectCategory(categoryId: string): Promise<void> {
    this.selectedCategoryId = categoryId;
    this.loading = true;

    try {
      this.products = await this.storeService.getProducts(
        this.selectedBranchId,
        categoryId || undefined,
      );
    } catch (error) {
      console.error(error);
      this.errorMessage = 'โหลดสินค้าไม่สำเร็จ';
    } finally {
      this.loading = false;
    }
  }
}

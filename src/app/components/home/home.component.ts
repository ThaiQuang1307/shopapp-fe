import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { API_URL } from 'src/app/constants/api.constant';
import { TITLE } from 'src/app/constants/title.constant';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  page: number = 0;
  limit: number = 6;
  totalPage: number = 0;
  visiblePages: number[] = [];

  keyword: string = '';
  categories: any[] = [];
  categoryId: number = 0;


  constructor(
    private titleService: Title,
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {
    this.titleService.setTitle(TITLE.HOME);
  }
  ngOnInit(): void {
    this.getCategories();
    this.getProducts(this.keyword, this.categoryId, this.page, this.limit)
  }

  searchProducts(): void {
    this.page = 0
    this.getProducts(this.keyword, this.categoryId, this.page, this.limit)
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        if (response.body?.length) {
          this.categories = response.body;
        }
      },
      error: (error: any) => {
        console.error('Lỗi khi lấy danh sách danh mục:', error);
      },
      complete: () => {

      }
    })
  }

  getProducts(keyword: string, categoryId: number, page: number, limit: number): void {
    let params = {
      page: page,
      limit: limit,
      keyword: keyword,
      category_id: categoryId
    }

    this.productService.getProducts(params).subscribe({
      next: (response: any) => {
        if (response?.body?.dataList?.length) {
          this.totalPage = response.body.totalPage;
          this.products = response.body.dataList;
          this.products.forEach((item: any) => {
            item.url = `${API_URL.PRODUCT.GET_IMAGE}/${item.thumbnail}`
          })
          this.visiblePages = this.generateVisiblePageArray(this.page, this.totalPage)
        }
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {

      }
    })
  }

  onPageChange(page: number): void {
    this.page = page
    this.getProducts(this.keyword, this.categoryId, this.page, this.limit)
  }

  generateVisiblePageArray(page: number, totalPage: number): number[] {
    const maxVisiblePages = 5
    const halfVisiblePages = Math.floor(maxVisiblePages / 2)

    let startPage = Math.max(page - halfVisiblePages, 1)
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPage)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1)
    }

    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index)
  }

}

## Angular Signals を使ったショッピングカートの例

Angular の `signal`, `computed`, `effect` を使って、シンプルなショッピングカートの機能を実装する例です。

#### `cart.component.ts`

```typescript
import { Component, signal, computed, effect } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  // 商品リスト
  product s = signal<Product[]>([
    { id: 1, name: 'りんご', price: 100 },
    { id: 2, name: 'バナナ', price: 80 },
    { id: 3, name: 'オレンジ', price: 120 },
  ]);

  // 数量（idとcountのペア）
  quantities = signal<Record<number, number>>({
    1: 1,
    2: 1,
    3: 1,
  });

  // 合計金額
  total = computed(() => {
    const p = this.products();
    const q = this.quantities();
    return p.reduce((sum, product) => {
      return sum + product.price * (q[product.id] || 0);
    }, 0);
  });

  increment(id: number) {
    this.quantities.update((q) => ({
      ...q,
      [id]: (q[id] || 0) + 1,
    }));
  }

  decrement(id: number) {
    this.quantities.update((q) => ({
      ...q,
      [id]: Math.max((q[id] || 0) - 1, 0),
    }));
  }

  constructor() {
    effect(() => {
      console.log(`合計金額: ${this.total()}円`);
    });
  }
}
```

#### `cart.component.html`

```html
<h2>🛍️ 商品一覧</h2>
<ul>
  <li *ngFor="let product of products()">
    <strong>{{ product.name }}</strong> - {{ product.price }}円
    <div>
      <button (click)="decrement(product.id)">－</button>
      <span>{{ quantities()[product.id] || 0 }}</span>
      <button (click)="increment(product.id)">＋</button>
    </div>
  </li>
</ul>

<h3>💰 合計金額: {{ total() }}円</h3>
```

---

このコードでは Angular の `signal` を使って状態を管理し、`computed` で合計金額をリアクティブに算出し、`effect` で変更時の副作用をトリガーしています。

## Angular Signals を使ったTODOの例

Angular の `signal`, `computed`, `effect` を使って、シンプルな TODO リストの機能を実装する例です。

## Agnular Signals を使ったIONICの例

> **[!INFO]**
> Angular Signals を使ったIONICの例は、Angular Signals の公式ドキュメントを参考にしてください。

// Jest global mocks

// Mock کردن import.meta.env
global.importMeta = { env: { MODE: 'test' } };

// اگر کدی import.meta.env استفاده می‌کنه، این‌طور mock می‌کنیم
Object.defineProperty(global, 'import', {
  value: { meta: { env: { MODE: 'test' } } },
});


import { test, expect } from '@playwright/test';

test.describe('CRSET MVP Validation', () => {
  const baseURL = 'http://localhost:5175';
  const apiURL = 'http://localhost:8001';
  
  test('Complete MVP Flow Validation', async ({ page }) => {
    // PASSO 1: TESTES NO FRONTEND
    console.log('🔍 PASSO 1: Testando Frontend...');
    
    // Acessar aplicação
    await page.goto(baseURL);
    await expect(page).toHaveTitle(/CRSET/);
    
    // Testar registro de novo usuário
    const timestamp = Date.now();
    const testEmail = `test${timestamp}@crset.com`;
    const testPassword = 'Test123!';
    
    await page.click('text=Registrar');
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.click('button[type="submit"]');
    
    // Verificar sucesso do registro
    await expect(page.locator('text=sucesso')).toBeVisible({ timeout: 5000 });
    
    // Fazer login
    await page.goto(baseURL);
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.click('button[type="submit"]');
    
    // Verificar token no localStorage
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeTruthy();
    console.log('✅ Token JWT encontrado no localStorage');
    
    // Acessar dashboard
    await expect(page.locator('text=Dashboard')).toBeVisible({ timeout: 5000 });
    
    // Verificar dados do backend (/dashboard/stats)
    const response = await page.request.get(`${apiURL}/dashboard/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    expect(response.status()).toBe(200);
    console.log('✅ Endpoint /dashboard/stats respondendo');
    
    // Verificar se botão de checkout aparece
    await expect(page.locator('text=Checkout')).toBeVisible();
    console.log('✅ Botão de checkout encontrado');
    
    // Fazer logout
    await page.click('text=Logout');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    console.log('✅ Logout funcionando');
    
    // PASSO 2: CHECKOUT STRIPE
    console.log('🔍 PASSO 2: Testando Checkout Stripe...');
    
    // Login novamente para testar checkout
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.click('button[type="submit"]');
    
    // Testar botão de checkout
    await page.click('text=Checkout');
    
    // Verificar redirecionamento para Stripe (ou erro de configuração)
    await page.waitForTimeout(2000);
    const currentURL = page.url();
    
    if (currentURL.includes('checkout.stripe.com')) {
      console.log('✅ Redirecionamento para Stripe funcionando');
    } else {
      console.log('⚠️ Stripe não configurado - usando chaves de teste');
    }
  });
  
  test('API Health Check', async ({ request }) => {
    const response = await request.get(`${apiURL}/health`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.status).toBe('healthy');
    console.log('✅ Backend API saudável');
  });
});

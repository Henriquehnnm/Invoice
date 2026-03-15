# Invoice CLI Demo
Output assets/invoice-demo.gif

Set FontSize 16
Set Width 1200
Set Height 600
Set Theme "GitHub Dark"

Type "invoice --help"
Enter
Sleep 2s

Type "clear"
Enter
Sleep 500ms

Type "invoice new"
Enter
Sleep 1s

# Preenchendo o formulário (simulando inputs do Clack)
# 1. Project name
Type "Website Redesign"
Enter
Sleep 800ms

# 2. Project description
Type "Complete redesign for client portfolio site"
Enter
Sleep 800ms

# 3. Charge type
Type "fix"
Enter
Sleep 800ms

# 4. Customer name
Type "Acme Corp"
Enter
Sleep 800ms

# 5. Customer email
Type "contact@acme.com"
Enter
Sleep 800ms

# 6. Customer company
Type "Acme Corporation"
Enter
Sleep 800ms

# 7. Start date
Type "2026-03-15"
Enter
Sleep 800ms

# 8. Delivery forecast
Type "30d"
Enter
Sleep 800ms

# 9. Project started (accept default)
Enter
Sleep 800ms

# 10. Total budget
Type "5000"
Enter
Sleep 800ms

# 11. Total value of the contract
Type "4500"
Enter
Sleep 800ms

# 12. Initial payment
Type "1500"
Enter
Sleep 800ms

# 13. Pay date forecast
Type "60d"
Enter
Sleep 1s

Type "clear"
Enter
Sleep 500ms

Type "invoice list"
Enter
Sleep 3s

Type "invoice get -i 1"
Enter
Sleep 3s

Type "invoice generate -i 1"
Enter
Sleep 2s

Type "ls invoice.pdf"
Enter
Sleep 2s
